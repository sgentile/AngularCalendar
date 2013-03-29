using System.Data.Entity;

namespace Calendar.Models
{
    public class CalendarItemsContext : DbContext
    {
         static CalendarItemsContext() 
         {
             Database.SetInitializer(new CalendarDatabaseInitializer());
         }
         public DbSet<CalendarItem> CalendarItems { get; set; }
    }
}