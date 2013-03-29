using System;
using System.Linq;
using System.Web.Http;
using Breeze.WebApi;
using Calendar.Models;
using Newtonsoft.Json.Linq;

namespace Todo.Controllers
{
    [BreezeController]
    public class CalendarItemsController : ApiController {

        private static readonly object Locker = new object();
        
        readonly EFContextProvider<CalendarItemsContext> _contextProvider =
            new EFContextProvider<CalendarItemsContext>();

        // ~/api/calendaritems/Metadata 
        [HttpGet]
        public string Metadata() {
            return _contextProvider.Metadata();
        }

        // ~/api/calendaritems/CalendarItems
        // ~/api/calendaritems/CalendarItems?$filter=IsArchived eq false&$orderby=CreatedAt 
        [HttpGet]
        public IQueryable<CalendarItem> CalendarItems() {
            var result = _contextProvider.Context.CalendarItems;
            return result;
        }

        // ~/api/calendaritems/SaveChanges
        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            var saveResult =  _contextProvider.SaveChanges(saveBundle);
            return saveResult;
        }
    }
}