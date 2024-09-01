using QuickApplyBackend.Database_Context;
using QuickApplyBackend.Model;

namespace QuickApplyBackend.Service
{
    public class SavedJobService
    {
        private QuickApplyContext _context;

        public SavedJobService(QuickApplyContext context) { _context = context; }

        public List<Job> getAllJobs(String userId)
        {
            List<Job> foundedJobs = _context.jobs.Where(j => j.UserId == userId).ToList();

            return foundedJobs;
        }

        public String createSavedJob(Job job)
        {

            //check if it exist first
            Job jobFound = _context.jobs.SingleOrDefault(obj => obj.Id == job.Id && obj.UserId == job.UserId);

            if (jobFound != null)
            {
                return "Job Already Saved";
            }

            _context.jobs.Add(job);
            _context.SaveChanges();

            return "New Job Saved";
        }

        public String deleteSavedJob(Job job)
        {
            Job jobFound = _context.jobs.SingleOrDefault(obj => obj.Id == job.Id && obj.UserId == job.UserId);

            if (jobFound != null)
            {
                _context.jobs.Remove(jobFound);
                _context.SaveChanges();

                return "Job Has Been Removed";
            }
            else
            {
                return "Job Is Not Found";
            }
            
        }
    }
}
