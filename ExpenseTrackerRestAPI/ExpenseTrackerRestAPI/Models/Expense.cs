using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerRestAPI.Models
{
    public class Expense
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; }
    }
}
