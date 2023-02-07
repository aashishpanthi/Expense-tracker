using ExpenseTrackerRestAPI.Models;

namespace ExpenseTrackerRestAPI.Models
{
    public class ExpenseTrackerDatabaseSettings : IExpenseTrackerDatabaseSettings
    {
        public string ExpensesCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
