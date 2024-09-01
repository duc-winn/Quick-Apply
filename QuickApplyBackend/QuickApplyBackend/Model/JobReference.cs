namespace QuickApplyBackend.Model
{
    public class JobReference
    {
        public int Id { get; set; }
        public String UserId { get; set; }
        public String JobId { get; set; }
        public List<EmployeeReferal> ListOfReferal { get; set; } 
    }
}
