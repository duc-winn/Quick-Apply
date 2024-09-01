using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuickApplyBackend.DTO;
using QuickApplyBackend.Model;
using QuickApplyBackend.Service;

namespace QuickApplyBackend.Controller
{
    [ApiController]
    public class SignInController : ControllerBase
    {
        private SignInService signinService;

        public SignInController(SignInService signinService)
        {
            this.signinService = signinService;
        }
        //2 endpoint sign up and log in

        //login will check if credential is correct, if so create a jwt that last 12hrs 
        //and send it back to the user, along with their respective UID
        [HttpPost, AllowAnonymous]
        [Route("/login-user")]
        public IActionResult loginUser([FromBody] UserDTO userDTO)
        {
            String result = signinService.loginUserDTO(userDTO);

            if(result == "Username Does Not Exist")
            {
                return NotFound("Username Does Not Exist");
            }
            else if(result == "Password And Username Does Not Match")
            {
                return Conflict("Password And Username Does Not Match");
            }
            
            //this is when the user is successfully signed in, now create them a token
            //and return an object that has their UID and their JWT
            //by this point we verified that the userDTO is correct

            LoginResponse response = signinService.createJWT(userDTO);

            return Ok(response);
                
            
        }

        //register will check if the user name has already been taken, if so , create a new user 
        //with a unique UID, and sign in for them automatically
        [HttpPost, AllowAnonymous]
        [Route("/register-user")]
        public IActionResult registerUser([FromBody] UserDTO userDTO)
        {
            String result = signinService.registerUserDTO(userDTO);

            if(result == "Username Has Been Taken")
            {
                return Conflict("Username Has Already Been Taken");
            }
            else
            {
                LoginResponse response = signinService.createJWT(userDTO);

                return Ok(response);
            }

        }
    }
}
