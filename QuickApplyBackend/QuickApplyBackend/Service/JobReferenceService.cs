using Microsoft.EntityFrameworkCore;
using QuickApplyBackend.Database_Context;
using QuickApplyBackend.Model;

namespace QuickApplyBackend.Service
{
    public class JobReferenceService
    {
        private QuickApplyContext _context;

        public JobReferenceService(QuickApplyContext context) {
            _context = context;
        }

        public String createJobReference(JobReference jobReference)
        {
            //we are going to manually set the userid, jobid, and the new list to the
            //retrieved object

            //if the object does not exist, then we will create a new object and set 
            //all three attribute with the given input
            try
            {
                JobReference jobFound = _context.jobReferences.Include(obj => obj.ListOfReferal).SingleOrDefault(obj => obj.UserId == jobReference.UserId && obj.JobId == jobReference.JobId);

                if (jobFound == null)
                {
                    JobReference newReference = new JobReference();
                    newReference.UserId = jobReference.UserId;
                    newReference.JobId = jobReference.JobId;
                    newReference.ListOfReferal = jobReference.ListOfReferal;

                    _context.jobReferences.Add(newReference);
                    _context.SaveChanges();
                }
                else
                {
                    jobFound.ListOfReferal.Clear();

                    jobFound.UserId = jobReference.UserId;
                    jobFound.JobId = jobReference.JobId;

                    foreach (var referal in jobReference.ListOfReferal)
                    {
                        jobFound.ListOfReferal.Add(referal);
                    }

                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                return "Something Went Wrong";
            }

            return "Reference Successfully Added";

        }

        public List<JobReference> getAllJobReference(String userId)
        {
            List<JobReference> jobFound = _context.jobReferences.Include(obj => obj.ListOfReferal).Where(obj2 => obj2.UserId == userId).ToList();
            return jobFound;
        }

        public String deleteJobReference(JobReference jobReference) {
            JobReference jobFound = _context.jobReferences.SingleOrDefault(obj => obj.UserId == jobReference.UserId && obj.JobId == jobReference.JobId);

            if (jobFound == null)
            {
                return "Job Reference Was Not Found";
            }
            else
            {
                _context.jobReferences.Remove(jobFound);
                _context.SaveChanges();
                return "Job Reference Was Removed";
            }
        }
    }
}
