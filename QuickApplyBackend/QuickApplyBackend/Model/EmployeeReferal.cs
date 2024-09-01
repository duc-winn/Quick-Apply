using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace QuickApplyBackend.Model
{
    public class EmployeeReferal
    {
        public int Id { get; set; }
        public String FullName { get; set; }
        public String Gender { get; set; }
        public String Email { get; set; }
        public String JobTitle { get; set; }
        public String JobDepartment { get; set; }
        public String SeniorityLevel { get; set; }

        public int JobReferenceId { get; set; }

        // Navigation property
        [JsonIgnore] public JobReference? JobReference { get; set; }


    }
}
