using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ExpenseTrackerRestAPI.Models
{
    public class Expense
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

        [BsonElement("ExpenseName")]
        public string ExpenseName { get; set; }

        [BsonElement("Amount")]
        public decimal Amount { get; set; }

        [BsonElement("Date")]
        public DateTime Date { get; set; }

        [BsonElement("Category")]
        public string Category { get; set; }

        [BsonElement("Description")]
        public string Description { get; set; }

        [BsonElement("User")]
        public string User { get; set; }
    }
}