import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  fetchCalendarEvents,
  addCalendarEvent,
} from "../../NativeModules/CalendarModule.ts";

const CalendarViewScreen = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const events = await fetchCalendarEvents();
        setCalendarEvents(events);
      } catch (error) {
        console.log("Error fetching calendar events:", error);
      }
    }
    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    const title = "New Event";
    const startDate = (Date.now() / 1000 + 3600) * 1000;
    const endDate = (Date.now() / 1000 + 3600 * 2) * 1000;
    try {
      await addCalendarEvent(title, startDate, endDate);
      // Refresh the events list after adding a new event
      const events = await fetchCalendarEvents();
      setCalendarEvents(events);
    } catch (error) {
      console.log("Error adding calendar event:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Calendar Events</Text>
      <FlatList
        data={calendarEvents}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDate}>
              {new Date(item.startDate * 1000).toDateString()}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.startDate.toString()}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
        <Text style={styles.addButtonText}>Add Event</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  eventItem: {
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventDate: {
    fontSize: 14,
    color: "gray",
  },
  addButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CalendarViewScreen;
