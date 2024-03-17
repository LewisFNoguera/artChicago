import React from "react";
import { ScrollView, View, Text } from "react-native";
import { MotiView } from "moti";
import { NativeModules } from "react-native";
import { useToast } from "@context/ToastContext";
import { DetailScreenProps } from "@utils/interface/navigation.interface";
import { ImageArt, Button } from "@components/index";
import { addCalendarEvent } from "../../components/NativeModules/CalendarModule";
import notifee from "@notifee/react-native";
import ArtDetails from "./components/ArtDetails";
import { styles } from "./DetailScreen.Style";

const { CalendarModule } = NativeModules;

const DetailScreen = ({ route }: DetailScreenProps) => {
  const { item } = route.params;
  const motiFromOptions = { opacity: 0, translateY: -50 };
  const motiAnimateOptions = { opacity: 1, translateY: 0 };
  const { showToast } = useToast();

  async function onDisplayNotification(_title: string, _body: string) {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    await notifee.displayNotification({
      title: _title,
      body: _body,
      android: {
        channelId,
        smallIcon: "ic_launcher",
        pressAction: {
          id: "default",
        },
      },
    });
  }

  const handleAddEvent = async (
    titleEvent: string = "",
    message: string = ""
  ) => {
    const title = "Remember to visit the artwork: " + titleEvent;
    const startDate = (Date.now() / 1000 + 3600) * 1000;
    const endDate = (Date.now() / 1000 + 3600 * 2) * 1000;
    const note = message;
    try {
      const res = await addCalendarEvent(title, startDate, endDate, note);
      if (res) {
        await onDisplayNotification(
          "Calendar Updated.",
          "Event added to your calendar. Check it out!."
        );
      }
    } catch (error) {
      await onDisplayNotification(
        "Event cannot be created!",
        "Error adding calendar event."
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <MotiView
        from={motiFromOptions}
        animate={motiAnimateOptions}
        transition={{ delay: 500 }}
      >
        <ImageArt image={item.image_id} />
      </MotiView>

      <View style={styles.content}>
        <MotiView
          from={motiFromOptions}
          animate={motiAnimateOptions}
          transition={{ delay: 200 }}
        >
          <ArtDetails item={item} />
        </MotiView>
      </View>

      <View style={styles.content}>
        <MotiView
          from={motiFromOptions}
          animate={motiAnimateOptions}
          transition={{ delay: 100 }}
        >
          <Text>
            Add an event to your calendar to remember to visit this artwork.
          </Text>
          <Button
            label={`Set a reminder to visit it.`}
            onPress={() => handleAddEvent(item?.title, item?.artist_display)}
            type="primary"
            size="md"
          />
        </MotiView>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
