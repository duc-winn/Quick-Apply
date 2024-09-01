using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuickApplyBackend.DTO;
using QuickApplyBackend.Model;
using QuickApplyBackend.Service;

namespace QuickApplyBackend.Controller
{
    [ApiController]
    public class AppliedJobController: ControllerBase
    {
        private AppliedJobService appliedJobService;

        public AppliedJobController(AppliedJobService appliedJobService)
        {
            this.appliedJobService = appliedJobService;
        } 

        [HttpPost, Authorize]
        [Route("/create-applied-job")]
        public IActionResult createAppliedJob([FromBody] AppliedJob appliedJob)
        {
            String result = appliedJobService.createAppliedJob(appliedJob);
            
            if(result == "Applied To Job Already")
            {
                return Conflict("Applied To This Job Already");
            }
            else
            {
                return Ok("Applied To Job Successfully");
            }
        }

        [HttpGet, Authorize]
        [Route("/get-all-applied-job")]
        public IActionResult getAllAppliedJob([FromQuery] String userId)
        {
            List<AppliedJob> result = appliedJobService.getAllAppliedJob(userId);

            if(result.Count == 0)
            {
                return NotFound("No Applied Job Found");
            }

            return Ok(result);
        }

        [HttpPut, Authorize]
        [Route("/update-applied-job")]
        public IActionResult updateAppliedJob([FromBody] AppliedJobDTO newStatus, [FromQuery] String userId, [FromQuery] String jobId)
        {
            String result = appliedJobService.updateAppliedJobStatus(newStatus, userId, jobId);

            if(result == "Cannot Find Job")
            {
                return NotFound("Job Could Not Be Found");
            }
            else
            {
                return Ok("Job Status Has Been Updated");
            }
        }

        [HttpDelete, Authorize]
        [Route("/delete-applied-job")]
        public IActionResult deleteAppliedJob([FromBody] AppliedJob appliedJob) {
            String result = appliedJobService.deleteAppliedJob(appliedJob);

            if(result == "Applied Job Could Not Be Found")
            {
                return NotFound("Applied Job Was Not Found");
            }
            else
            {
                return Ok("Applied Job Was Removed");
            }
        }
    }
}
