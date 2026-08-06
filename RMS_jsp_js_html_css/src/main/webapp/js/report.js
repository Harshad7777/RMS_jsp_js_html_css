const REPORT_API = "http://localhost:8080/api/report/sales/date";


const token = localStorage.getItem("token");


if (!token) {

    alert("Please Login First");

    window.location.href = "login.jsp";

}



document.addEventListener("DOMContentLoaded", loadReport);



function loadReport() {


    fetch(REPORT_API, {

        method: "GET",

        headers: {

            "Authorization": "Bearer " + token,

            "Content-Type": "application/json"

        }

    })


    .then(response => {


        if (!response.ok) {

            throw new Error("Report loading failed");

        }


        return response.json();


    })


    .then(data => {


        let rows = "";

        let totalSales = 0;



        if(data.length === 0){


            rows = `

            <tr>

                <td colspan="3" 
                    class="text-center text-muted py-5">

                    No Sales Report Available

                </td>

            </tr>

            `;


        }

        else {



            data.forEach(report => {



                totalSales += Number(report.totalSales);



                rows += `

                <tr>


                    <td class="text-center">

                        ${report.reportDate}

                    </td>


                    <td class="text-center">

                        ${report.totalOrders}

                    </td>


                    <td class="text-center">

                        ₹${Number(report.totalSales).toFixed(2)}

                    </td>


                </tr>


                `;


            });


        }




        document.getElementById("reportTable").innerHTML = rows;


        document.getElementById("totalSales").innerHTML =
            totalSales.toFixed(2);



        document.getElementById("totalSalesFooter").innerHTML =
            totalSales.toFixed(2);



        document.getElementById("generatedDate").innerHTML =
            new Date().toLocaleString();



    })


    .catch(error => {


        console.error("REPORT ERROR:", error);


        alert("Unable to load report");


    });


}