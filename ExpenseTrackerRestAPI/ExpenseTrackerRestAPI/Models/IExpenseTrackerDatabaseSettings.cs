namespace ExpenseTrackerRestAPI.Models
{
    public interface IExpenseTrackerDatabaseSettings
    {
        string ExpensesCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
