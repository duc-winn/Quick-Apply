using Microsoft.IdentityModel.Tokens;
using QuickApplyBackend.Database_Context;
using QuickApplyBackend.DTO;
using QuickApplyBackend.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace QuickApplyBackend.Service
{
    public class SignInService
    {
        private QuickApplyContext _context;
        private IConfiguration configuration;

        public SignInService(QuickApplyContext context, IConfiguration configuration) { 
            _context = context; 
            this.configuration = configuration;
        }
        public String loginUserDTO(UserDTO userDTO)
        {
            //check if the username and password matches
            User userFound = _context.users.SingleOrDefault(obj => obj.username == userDTO.username);
            if (userFound == null) {
                return "Username Does Not Exist";
            }

            if(!BCrypt.Net.BCrypt.Verify(userDTO.password, userFound.passwordHash))
            {
                return "Password And Username Does Not Match";
            }

            return "Logged In Successfully";

        }

        public String registerUserDTO(UserDTO userDTO) { 
            //lets check if the username has already been taken
            bool userFound = _context.users.Any(obj => obj.username == userDTO.username);

            if(userFound)
            {
                return "Username Has Been Taken";
            }

            //create a new user with a unique UID and hashed password
            String uniqueUserId = GenerateUniqueUserId();
            String passHash = BCrypt.Net.BCrypt.HashPassword(userDTO.password);

            User newUser = new User();
            newUser.username = userDTO.username;
            newUser.passwordHash = passHash;
            newUser.userId = uniqueUserId;

            _context.users.Add(newUser);
            _context.SaveChanges();

            return "User Successfully Created";

        }

        public LoginResponse createJWT(UserDTO userDTO)
        {
            LoginResponse response = new LoginResponse();
            User userFound = _context.users.SingleOrDefault(obj => obj.username == userDTO.username);

            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userDTO.username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                configuration.GetSection("AppSettings:Token").Value!));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddHours(12),
                    signingCredentials: cred
            );

            String jwt = new JwtSecurityTokenHandler().WriteToken(token);
            response.userId = userFound.userId;
            response.JsonWebToken = jwt;

            return response;
        }

        public string GenerateUniqueUserId()
        {
            string newUserId;

            do
            {
                newUserId = GenerateRandomId();
            } while (IsUserIdExists(newUserId));

            return newUserId;
        }

        public string GenerateRandomId()
        {
            Random random = new Random();
            return random.Next(10000, 99999).ToString();
        }

        public bool IsUserIdExists(string newUserId)
        {
            return _context.users.Any(obj => obj.userId == newUserId);
        }
    }
}
