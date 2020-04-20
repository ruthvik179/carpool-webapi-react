using Microsoft.EntityFrameworkCore.Migrations;

namespace CarpoolReact.Migrations
{
    public partial class fourth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RideRequest_Drivers_DriverId",
                table: "RideRequest");

            migrationBuilder.DropIndex(
                name: "IX_RideRequest_DriverId",
                table: "RideRequest");

            migrationBuilder.DropColumn(
                name: "Destination",
                table: "Route");

            migrationBuilder.DropColumn(
                name: "Source",
                table: "Route");

            migrationBuilder.DropColumn(
                name: "BoardingPoint",
                table: "RideRequest");

            migrationBuilder.DropColumn(
                name: "DropoffPoint",
                table: "RideRequest");

            migrationBuilder.AddColumn<string>(
                name: "DestinationId",
                table: "Route",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SourceId",
                table: "Route",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RideId",
                table: "RideRequest",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DriverId",
                table: "RideRequest",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "AmountInINr",
                table: "RideRequest",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "BoardingPointId",
                table: "RideRequest",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DropoffPointId",
                table: "RideRequest",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Seat",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    SeatState = table.Column<int>(nullable: false),
                    RiderId = table.Column<string>(nullable: true),
                    RideId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Seat_Rides_RideId",
                        column: x => x.RideId,
                        principalTable: "Rides",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Route_DestinationId",
                table: "Route",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_Route_SourceId",
                table: "Route",
                column: "SourceId");

            migrationBuilder.CreateIndex(
                name: "IX_RideRequest_BoardingPointId",
                table: "RideRequest",
                column: "BoardingPointId");

            migrationBuilder.CreateIndex(
                name: "IX_RideRequest_DropoffPointId",
                table: "RideRequest",
                column: "DropoffPointId");

            migrationBuilder.CreateIndex(
                name: "IX_RideRequest_RideId",
                table: "RideRequest",
                column: "RideId");

            migrationBuilder.CreateIndex(
                name: "IX_Seat_RideId",
                table: "Seat",
                column: "RideId");

            migrationBuilder.AddForeignKey(
                name: "FK_RideRequest_Location_BoardingPointId",
                table: "RideRequest",
                column: "BoardingPointId",
                principalTable: "Location",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RideRequest_Location_DropoffPointId",
                table: "RideRequest",
                column: "DropoffPointId",
                principalTable: "Location",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RideRequest_Rides_RideId",
                table: "RideRequest",
                column: "RideId",
                principalTable: "Rides",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Route_Location_DestinationId",
                table: "Route",
                column: "DestinationId",
                principalTable: "Location",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Route_Location_SourceId",
                table: "Route",
                column: "SourceId",
                principalTable: "Location",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RideRequest_Location_BoardingPointId",
                table: "RideRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_RideRequest_Location_DropoffPointId",
                table: "RideRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_RideRequest_Rides_RideId",
                table: "RideRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_Route_Location_DestinationId",
                table: "Route");

            migrationBuilder.DropForeignKey(
                name: "FK_Route_Location_SourceId",
                table: "Route");

            migrationBuilder.DropTable(
                name: "Seat");

            migrationBuilder.DropIndex(
                name: "IX_Route_DestinationId",
                table: "Route");

            migrationBuilder.DropIndex(
                name: "IX_Route_SourceId",
                table: "Route");

            migrationBuilder.DropIndex(
                name: "IX_RideRequest_BoardingPointId",
                table: "RideRequest");

            migrationBuilder.DropIndex(
                name: "IX_RideRequest_DropoffPointId",
                table: "RideRequest");

            migrationBuilder.DropIndex(
                name: "IX_RideRequest_RideId",
                table: "RideRequest");

            migrationBuilder.DropColumn(
                name: "DestinationId",
                table: "Route");

            migrationBuilder.DropColumn(
                name: "SourceId",
                table: "Route");

            migrationBuilder.DropColumn(
                name: "AmountInINr",
                table: "RideRequest");

            migrationBuilder.DropColumn(
                name: "BoardingPointId",
                table: "RideRequest");

            migrationBuilder.DropColumn(
                name: "DropoffPointId",
                table: "RideRequest");

            migrationBuilder.AddColumn<string>(
                name: "Destination",
                table: "Route",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Source",
                table: "Route",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RideId",
                table: "RideRequest",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DriverId",
                table: "RideRequest",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BoardingPoint",
                table: "RideRequest",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DropoffPoint",
                table: "RideRequest",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RideRequest_DriverId",
                table: "RideRequest",
                column: "DriverId");

            migrationBuilder.AddForeignKey(
                name: "FK_RideRequest_Drivers_DriverId",
                table: "RideRequest",
                column: "DriverId",
                principalTable: "Drivers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
