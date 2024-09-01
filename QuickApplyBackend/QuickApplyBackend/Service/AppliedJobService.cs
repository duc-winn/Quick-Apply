using QuickApplyBackend.Database_Context;
using QuickApplyBackend.DTO;
using QuickApplyBackend.Model;

namespace QuickApplyBackend.Service
{
    public class AppliedJobService
    {
        private QuickApplyContext _context;

        public AppliedJobService(QuickApplyContext context)
        {
            _context = context;
        }
        public String createAppliedJob(AppliedJob appliedJob)
        {
            //first check if the job has been applied to already
            AppliedJob foundJob = _context.appliedJobs.SingleOrDefault(obj => obj.JobId == appliedJob.JobId && obj.UserId == appliedJob.UserId);

            if (foundJob != null) {
                return "Applied To Job Already";
            }

            _context.appliedJobs.Add(appliedJob);
            _context.SaveChanges();

            return "Applied Successfully";
        }

        public List<AppliedJob> getAllAppliedJob(String userId)
        {
            List<AppliedJob> response = _context.appliedJobs.Where(obj => obj.UserId == userId).ToList();

            return response;
        }

        public String updateAppliedJobStatus(AppliedJobDTO newAttributeObj,String userId, String jobId)
        {
            //grab the object by id, change the status, save the changes, return that it was changed
            AppliedJob jobFound = _context.appliedJobs.SingleOrDefault(obj => obj.JobId == jobId && obj.UserId == userId);

            if(jobFound == null)
            {
                return "Cannot Find Job";
            }

            jobFound.JobStatus = newAttributeObj.newJobStatus;
            _context.SaveChanges();

            return "Job Status Successfully Updated";
        }

        public String deleteAppliedJob(AppliedJob appliedJob) {
            AppliedJob jobFound = _context.appliedJobs.SingleOrDefault(obj => obj.JobId == appliedJob.JobId && obj.UserId == appliedJob.UserId);

            if(jobFound == null)
            {
                return "Applied Job Could Not Be Found";
            }

            _context.appliedJobs.Remove(jobFound);
            _context.SaveChanges();

            return "Job Has Been Deleted Successfully";
        }
    }
}
