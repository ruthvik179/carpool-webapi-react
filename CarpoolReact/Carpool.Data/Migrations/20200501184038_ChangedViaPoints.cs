using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.Migrations
{
    public partial class ChangedViaPoints : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CGST",
                table: "RideRequests");

            migrationBuilder.DropColumn(
                name: "SGST",
                table: "RideRequests");

            migrationBuilder.DropColumn(
                name: "RideId",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Locations");

            migrationBuilder.AddColumn<string>(
                name: "ViaPointIds",
                table: "Rides",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ViaPointIds",
                table: "Rides");

            migrationBuilder.AddColumn<double>(
                name: "CGST",
                table: "RideRequests",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "SGST",
                table: "RideRequests",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "RideId",
                table: "Locations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Locations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
