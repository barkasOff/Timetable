using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Services;
using Application.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [AllowAnonymous]
  [ApiController]
  [Route("api/[controller]")]
  public class AccountController : ControllerBase
  {
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly TokenService _tokenService;

    public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, TokenService tokenService)
    {
      _tokenService = tokenService;
      _signInManager = signInManager;
      _userManager = userManager;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
    {
      var user = await _userManager.Users
        .Include(u => u.Photos)
        .FirstOrDefaultAsync(u => u.Email == loginDTO.Email);

      if (user == null)
        return (Unauthorized());
      var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

      if (result.Succeeded)
        return (ConvertEntityToUser(user));
      return (Unauthorized());
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDTO>> GetCurrentUser()
    {
      var user = await _userManager.Users
        .Include(u => u.Photos)
        .FirstOrDefaultAsync(u => u.Email == User.FindFirstValue(ClaimTypes.Email));
      
      if (user != null)
        return (ConvertEntityToUser(user));
      return (Unauthorized());
    }

    private UserDTO ConvertEntityToUser(User user)
    {
      if (user == null)
        return (null);
      return (new UserDTO
      {
        DisplayName = user.DisplayName,
        Image = user?.Photos?.FirstOrDefault(p => p.IsMain)?.Url,
        Token = _tokenService.CreateToken(user),
        Username = user.UserName
      });
    }
  }
}