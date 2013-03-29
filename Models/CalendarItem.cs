using System;
using System.ComponentModel.DataAnnotations;

namespace Calendar.Models
{
    public class CalendarItem
    {
        public CalendarItem()
        {
            allDay = true;
        }

        public int id { get; set; }                     // 42

        [Required, StringLength(maximumLength: 30)]     // Validation rules
        public string title { get; set; }         // "Get milk"

        public DateTime start { get; set; }

        public bool allDay { get; set; }
    }
}