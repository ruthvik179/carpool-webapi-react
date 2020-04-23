using Microsoft.EntityFrameworkCore.Migrations;

namespace CarpoolReact.Migrations
{
    public partial class cancellationforriders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DropoffPointId",
                table: "Bookings",
                newName: "DropOffPointId");

            migrationBuilder.AddColumn<int>(
                name: "RideState",
                table: "Rides",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RideState",
                table: "Rides");

            migrationBuilder.RenameColumn(
                name: "DropOffPointId",
                table: "Bookings",
                newName: "DropoffPointId");
        }
    }
}
