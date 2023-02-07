using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using ExpenseTrackerRestAPI.Models;

namespace ExpenseTrackerRestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly IMongoCollection<Expense> _expenses;

        public ExpenseController(IExpenseTrackerDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _expenses = database.GetCollection<Expense>(settings.ExpensesCollectionName);
        }

        // GET: api/Expense
        [HttpGet]
        public ActionResult<IEnumerable<Expense>> Get()
        {
            return _expenses.Find(expense => true).ToList();
        }

        // GET: api/Expense/5
        [HttpGet("{id}", Name = "GetExpense")]
        public ActionResult<Expense> Get(string id)
        {
            var expense = _expenses.Find<Expense>(e => e.Id == id).FirstOrDefault();

            if (expense == null)
            {
                return NotFound();
            }

            return expense;
        }

        // POST: api/Expense
        [HttpPost]
        public ActionResult<Expense> Post(Expense expense)
        {
            _expenses.InsertOne(expense);
            return CreatedAtRoute("GetExpense", new { id = expense.Id.ToString() }, expense);
        }

        // PUT: api/Expense/5
        [HttpPut("{id}")]
        public IActionResult Put(string id, Expense expenseIn)
        {
            var expense = _expenses.Find<Expense>(e => e.Id == id).FirstOrDefault();

            if (expense == null)
            {
                return NotFound();
            }

            _expenses.ReplaceOne(e => e.Id == id, expenseIn);

            return NoContent();
        }

        // DELETE: api/Expense/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var expense = _expenses.Find<Expense>(e => e.Id == id).FirstOrDefault();

            if (expense == null)
            {
                return NotFound();
            }

            _expenses.DeleteOne(e => e.Id == id);

            return NoContent();
        }
    }
}
