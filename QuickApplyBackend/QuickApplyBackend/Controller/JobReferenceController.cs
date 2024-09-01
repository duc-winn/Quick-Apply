using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuickApplyBackend.Model;
using QuickApplyBackend.Service;

namespace QuickApplyBackend.Controller
{
    [ApiController]
    public class JobReferenceController : ControllerBase
    {
        private JobReferenceService jobReferenceService;

        public JobReferenceController(JobReferenceService jobReferenceService)
        {
            this.jobReferenceService = jobReferenceService;
        }

        [HttpPut, Authorize]
        [Route("/create-update-job-references")]
        public IActionResult createJobReference([FromBody] JobReference reference)
        {
            String result = jobReferenceService.createJobReference(reference);

            if(result == "Reference Successfully Added")
            {
                return Ok("Job Reference Was Successfully Added/Updated");
            }
            else
            {
                return Conflict("Something Went Wrong");
            }
        }

        [HttpGet, Authorize]
        [Route("/get-all-job-references")]
        public IActionResult getAllJobReference([FromQuery] String userId)
        {
            List<JobReference> result = jobReferenceService.getAllJobReference(userId);

            if(result.Count == 0)
            {
                return NotFound("No Job References Was Found");
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpDelete, Authorize]
        [Route("/delete-job-reference")]
        public IActionResult deleteJobReference([FromBody] JobReference reference) { 
            String result = jobReferenceService.deleteJobReference(reference);

            if(result == "Job Reference Was Not Found")
            {
                return NotFound("Job Reference Could Not Be Found");
            }
            else
            {
                return Ok("Job Reference Was Successfully Removed");
            }
        }
    }
}
