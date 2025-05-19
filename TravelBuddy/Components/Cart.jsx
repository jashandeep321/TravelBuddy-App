import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import RazorpayCheckout from 'react-native-razorpay';

const GST_RATE = 18; // 18% GST
const RAZORPAY_KEY_ID = 'rzp_test_uP1O3L7SKR4qPn';

const Cart = ({navigation}) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState({});

  // Load cart from storage
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load cart');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadCart);
    loadCart();
    return unsubscribe;
  }, [navigation]);

  // Cart management functions
  const addToCart = async pkg => {
    try {
      const existingItem = cartItems.find(item => item.id === pkg.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = cartItems.map(item =>
          item.id === pkg.id
            ? {...item, quantity: (item.quantity || 1) + 1}
            : item,
        );
      } else {
        updatedCart = [...cartItems, {...pkg, quantity: 1}];
      }

      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    } catch (error) {
      Alert.alert('Error', 'Failed to add to cart');
      console.error(error);
    }
  };

  const removeFromCart = async id => {
    try {
      const updatedCart = cartItems.filter(item => item.id !== id);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    } catch (error) {
      Alert.alert('Error', 'Failed to remove item');
      console.error(error);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const updatedCart = cartItems.map(item =>
        item.id === id ? {...item, quantity: newQuantity} : item,
      );
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    } catch (error) {
      Alert.alert('Error', 'Failed to update quantity');
      console.error(error);
    }
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0,
    );
    const gstAmount = (subtotal * GST_RATE) / 100;
    const total = subtotal + gstAmount;

    return {
      subtotal: subtotal.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const {subtotal, gstAmount, total} = calculateTotals();

  const navigateToPackage = item => {
    navigation.navigate('PackageDetails', {
      slug: item.slug || item.id,
      package: item,
    });
  };

  const handlePayment = async amount => {
    const options = {
      description: 'Travel Package Payment',
      image: 'https://your-app-logo-url.png',
      currency: 'INR',
      key: RAZORPAY_KEY_ID,
      amount: Math.round(amount * 100), // Convert to paise
      name: 'Travel Buddy',
      prefill: {
        email: 'user@example.com',
        contact: '',
        name: 'User',
      },
      theme: {color: '#3498db'},
    };

    try {
      const data = await RazorpayCheckout.open(options);

      if (data.razorpay_payment_id) {
        // Payment successful
        Alert.alert(
          'Success',
          'Payment Successful! Your order has been placed.',
          [
            {
              text: 'OK',
              onPress: async () => {
                // Clear cart after successful payment
                await AsyncStorage.setItem('cart', JSON.stringify([]));
                setCartItems([]);
                navigation.navigate('Home');
              },
            },
          ],
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        `Payment failed: ${error.message || error.description}`,
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="shopping-cart" size={50} color="#ccc" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubtext}>Add packages to see them here</Text>
        </View>
      ) : (
        <>
          {cartItems.map(item => {
            const itemKey = item.id || `item-${item.title}`;
            return (
              <View key={itemKey} style={styles.itemContainer}>
                <TouchableOpacity
                  onPress={() => navigateToPackage(item)}
                  style={{flexDirection: 'row', alignItems: 'center', flex: 1}}
                  activeOpacity={0.8}>
                  <Image
                    source={{uri: item.image}}
                    style={styles.itemImage}
                    onError={() =>
                      setImageError(prev => ({...prev, [itemKey]: true}))
                    }
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>
                      {item.title || 'Package'}
                    </Text>
                    <Text style={styles.itemPrice}>
                      ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                    </Text>
                    {item.duration && (
                      <Text style={styles.itemDuration}>{item.duration}</Text>
                    )}
                  </View>
                </TouchableOpacity>

                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      updateQuantity(item.id, (item.quantity || 1) - 1)
                    }
                    style={styles.quantityButton}>
                    <Text style={styles.quantityText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityValue}>{item.quantity || 1}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      updateQuantity(item.id, (item.quantity || 1) + 1)
                    }
                    style={styles.quantityButton}>
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={e => {
                    e.stopPropagation();
                    removeFromCart(item.id);
                  }}>
                  <Icon name="trash" size={20} color="#ff4444" />
                </TouchableOpacity>
              </View>
            );
          })}

          <View style={styles.totalContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>₹{subtotal}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>GST ({GST_RATE}%):</Text>
              <Text style={styles.summaryValue}>₹{gstAmount}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>₹{total}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => handlePayment(parseFloat(total))}>
              <Text style={styles.checkoutButtonText}>Pay Now ₹{total}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginTop: 5,
  },
  itemDuration: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityValue: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    padding: 10,
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#555',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  checkoutButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default Cart;
