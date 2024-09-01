using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuickApplyBackend.Model;
using QuickApplyBackend.Service;

namespace QuickApplyBackend.Controller
{
    [ApiController]
    public class SavedJobController: ControllerBase
    {
        private SavedJobService savedJobService;
        public SavedJobController(SavedJobService service)
        {
            this.savedJobService = service;
        }

        [HttpGet, Authorize]
        [Route("/get-all-saved-job")]
        public IActionResult getAllJobs([FromQuery] String userId)
        {
            List<Job> result = savedJobService.getAllJobs(userId);

            if (result.Count == 0) { 
                return NotFound("No Saved Jobs Were Found.");
            }

            return Ok(result);
        }

        [HttpPost, Authorize]
        [Route("/create-saved-job")]
        public IActionResult createSavedJob([FromBody] Job job)
        {
            String result = savedJobService.createSavedJob(job);
            
            if(result == "Job Already Saved")
            {
                return Conflict("Job Has Already Been Saved");
            }

            return Ok("Job Has Been Saved");
        }

        [HttpDelete, Authorize]
        [Route("/delete-saved-job")]
        public IActionResult deleteSavedJob([FromBody] Job job)
        {
            String result = savedJobService.deleteSavedJob(job);

            if(result == "Job Has Been Removed")
            {
                return Ok("Job Has Been Unsaved");
            }
            else
            {
                return Conflict("Something Went Wrong");
            }
        }
    }
}
