import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyDGTWVqhotHfUgck1jzh5V2tuibdgqhvV4';

export default function Itinerary() {
  const [place, setPlace] = useState('');
  const [days, setDays] = useState('');
  const [preferences, setPreferences] = useState('');
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateItinerary = async () => {
    if (!place || !days) {
      setItinerary(null);
      alert('Please enter both a place and number of days.');
      return;
    }

    const prompt = `Create a concise travel itinerary for ${days} days in ${place}. 
    Focus on 3 key activities per day (morning, afternoon, evening). 
    Keep each activity under 15 words. 
    Format as: "Day X: [Title]\n- Time: [Activity]\n- Time: [Activity]\n- Time: [Activity]"
    Preferences: ${preferences || 'none'}.`;

    try {
      setLoading(true);
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }]
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (text) {
        const parsedItinerary = parseItinerary(text);
        setItinerary(parsedItinerary);
      } else {
        setItinerary(null);
        alert('No response from the server.');
      }
    } catch (error) {
      console.error('API Error:', error);
      setItinerary(null);
      alert('Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const parseItinerary = (text) => {
    const days = text.split('\n\n');
    return days.map(dayText => {
      const lines = dayText.split('\n');
      return {
        day: lines[0].replace('Day', 'Day').replace(':', ':'),
        activities: lines.slice(1).filter(line => line.startsWith('-'))
      };
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>Travel Itinerary</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="Place (e.g., Paris)" 
          value={place} 
          onChangeText={setPlace} 
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Days (e.g., 3)" 
          value={days} 
          onChangeText={setDays} 
          keyboardType="numeric" 
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Preferences (e.g., food, museums)" 
          value={preferences} 
          onChangeText={setPreferences} 
        />
        
        <TouchableOpacity 
          style={[styles.button, loading && styles.disabledButton]} 
          onPress={generateItinerary} 
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Generating...' : 'Generate Itinerary'}
          </Text>
        </TouchableOpacity>

        {itinerary && (
          <View style={styles.itineraryContainer}>
            {itinerary.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <Text style={styles.dayHeader}>{day.day}</Text>
                {day.activities.map((activity, i) => (
                  <View key={i} style={styles.activityContainer}>
                    <Text style={styles.activityText}>{activity.replace('- ', '')}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  scroll: { 
    padding: 20,
    paddingBottom: 40 
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 25, 
    textAlign: 'center',
    color: '#2c3e50'
  },
  input: { 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15, 
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#dfe6e9'
  },
  button: { 
    backgroundColor: '#3498db', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  disabledButton: {
    backgroundColor: '#bdc3c7'
  },
  buttonText: { 
    color: 'white', 
    fontWeight: '600',
    fontSize: 16 
  },
  itineraryContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  dayContainer: {
    marginBottom: 20
  },
  dayHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dfe6e9',
    paddingBottom: 8
  },
  activityContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db'
  },
  activityText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20
  }
});
