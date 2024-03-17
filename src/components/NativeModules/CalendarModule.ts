import { NativeModules } from "react-native";

const { CalendarModule } = NativeModules;

export const addCalendarEvent = async (
  title: string,
  startDate: Number,
  endDate: Number,
  note: string
) => {
  try {
    const result = await CalendarModule.addEvent(
      title,
      startDate,
      endDate,
      note
    );
    return result;
  } catch (error: any) {
    throw new Error("Error adding calendar event: " + error.message);
  }
};
