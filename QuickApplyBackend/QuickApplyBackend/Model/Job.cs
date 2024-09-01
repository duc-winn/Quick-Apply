using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace QuickApplyBackend.Model
{
    public class Job
    {
        [Key] public int Id { get; set; }
        public String CompanyIconUrl { get; set; }
        public String UserId { get; set; }
        public String JobId {  get; set; }  //this is the linkedin job id
        public String JobTitle { get; set; }
        public String CompanyName { get; set; }
        public String Location { get; set; }
        public String PositionType { get; set; }
        public String PostDateAndTime  { get; set; }
        public String JobDescription { get; set; }   
        public List<String> ApplyLinks { get; set; } = new List<String>(); 
        public String SpecificLocation { get; set; } 
        public String FormattedJobFunctions { get; set; }
        public List<String> SkillsRequired { get; set; } = new List<String>();

        //no need for constructor because of the auto Model Mapping feature
    }
}
