using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.Migrations
{
    public partial class bookingmodelupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BillId",
                table: "Bookings",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BoardingPointId",
                table: "Bookings",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DriverId",
                table: "Bookings",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DropoffPointId",
                table: "Bookings",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RideId",
                table: "Bookings",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RiderId",
                table: "Bookings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BillId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "BoardingPointId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "DriverId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "DropoffPointId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "RideId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "RiderId",
                table: "Bookings");
        }
    }
}
