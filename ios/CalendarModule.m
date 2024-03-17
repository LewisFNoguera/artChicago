#import "CalendarModule.h"
#import <React/RCTConvert.h>
#import <React/RCTUtils.h>
#import <EventKit/EventKit.h>

@implementation CalendarModule
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(addEvent:(NSString *)title startDate:(double)startDate endDate:(double)endDate notes:(NSString *)notes resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    EKEventStore *eventStore = [[EKEventStore alloc] init];
    [eventStore requestAccessToEntityType:EKEntityTypeEvent completion:^(BOOL granted, NSError *error) {
        if (granted) {
            EKEvent *event = [EKEvent eventWithEventStore:eventStore];
            event.title = title;
            event.notes = notes;
            NSTimeInterval startDateInterval = startDate / 1000;
            event.startDate = [NSDate dateWithTimeIntervalSince1970:startDateInterval];
            NSTimeInterval endDateInterval = endDate / 1000;
            NSLog(@"%@", [NSDate dateWithTimeIntervalSince1970:endDateInterval]);
            event.endDate = [NSDate dateWithTimeIntervalSince1970:endDateInterval];
            event.calendar = eventStore.defaultCalendarForNewEvents;
          
            NSError *saveError = nil;
            BOOL success = [eventStore saveEvent:event span:EKSpanThisEvent commit:YES error:&saveError];
            if (success) {
                resolve(@"Event added successfully");
            } else {
                reject(@"event_add_error", @"Error adding event", saveError);
            }
        } else {
            reject(@"calendar_permission_error", @"Calendar permission denied", error);
        }
    }];
}
@end
