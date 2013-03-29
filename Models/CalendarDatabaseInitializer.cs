using System;
using System.Data.Entity;

namespace Calendar.Models
{
    public class CalendarDatabaseInitializer : DropCreateDatabaseAlways<CalendarItemsContext> //DropCreateDatabaseIfModelChanges<CalendarItemsContext> //
    {
        protected override void Seed(CalendarItemsContext context)
        {
            SeedDatabase(context);
        }

        private static void SeedDatabase(CalendarItemsContext context)
        {
            var calendarItems = new[]
                {
                    new CalendarItem
                        {                            
                            start = DateTime.Now,
                            title = "Steak Dinner",                            
                        },
                        new CalendarItem
                            {
                                start = DateTime.Now.Subtract(new TimeSpan(1, 0, 0, 0)),
                                title = "Cheese Burger"
                            }
                };
            Array.ForEach(calendarItems, t => context.CalendarItems.Add(t));
            context.SaveChanges();
        }
    }
}