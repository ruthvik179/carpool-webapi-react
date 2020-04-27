using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.Migrations
{
    public partial class taxes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SeatState",
                table: "Seats");

            migrationBuilder.DropColumn(
                name: "AmountInINr",
                table: "RideRequests");

            migrationBuilder.DropColumn(
                name: "RequestStatus",
                table: "RideRequests");

            migrationBuilder.AddColumn<int>(
                name: "State",
                table: "Seats",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Amount",
                table: "RideRequests",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "CGST",
                table: "RideRequests",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "SGST",
                table: "RideRequests",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "RideRequests",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "CGST",
                table: "Bills",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "SGST",
                table: "Bills",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "State",
                table: "Seats");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "RideRequests");

            migrationBuilder.DropColumn(
                name: "CGST",
                table: "RideRequests");

            migrationBuilder.DropColumn(
                name: "SGST",
                table: "RideRequests");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "RideRequests");

            migrationBuilder.DropColumn(
                name: "CGST",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "SGST",
                table: "Bills");

            migrationBuilder.AddColumn<int>(
                name: "SeatState",
                table: "Seats",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "AmountInINr",
                table: "RideRequests",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "RequestStatus",
                table: "RideRequests",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
