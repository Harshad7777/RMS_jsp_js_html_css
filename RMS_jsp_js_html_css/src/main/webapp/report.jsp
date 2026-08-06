<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<%@ include file="includes/header.jsp" %>


<link rel="stylesheet"
      href="${pageContext.request.contextPath}/css/report.css">


<body>





<%@ include file="includes/sidebar.jsp" %>


<div class="main-content">


    <%@ include file="includes/navbar.jsp" %>



    <div class="container-fluid py-4">



        <!-- PAGE TITLE -->

        <div class="d-flex justify-content-between align-items-center mb-4">


            <h2 class="fw-bold">

                <i class="fa-solid fa-chart-column text-success"></i>

                Sales Report

            </h2>



            <button class="btn btn-primary"
                    onclick="window.print()">

                <i class="fa-solid fa-print"></i>

                Print Report

            </button>


        </div>




        <!-- REPORT CARD -->


        <div class="card shadow border-0">


            <div class="card-header bg-success text-white 
                        d-flex justify-content-between align-items-center">


                <h5 class="mb-0">

                    <i class="fa-solid fa-chart-line"></i>

                    Sales Report

                </h5>



                <span class="badge bg-light text-success fs-6">

                    Total Sales :
                    ₹ <span id="totalSales">0.00</span>

                </span>


            </div>





            <div class="card-body">


                <div class="table-responsive">


                    <table class="table table-striped 
                                  table-hover 
                                  table-bordered 
                                  align-middle">


                        <thead class="table-success">


                            <tr>


                                <th class="text-center">

                                    <i class="fa-solid fa-calendar-days"></i>

                                    Date

                                </th>



                                <th class="text-center">

                                    <i class="fa-solid fa-cart-shopping"></i>

                                    Total Orders

                                </th>



                                <th class="text-center">

                                    <i class="fa-solid fa-indian-rupee-sign"></i>

                                    Total Sales (₹)

                                </th>


                            </tr>


                        </thead>




                        <tbody id="reportTable">


                            <tr>

                                <td colspan="3"
                                    class="text-center text-muted py-5">


                                    Loading Report...


                                </td>


                            </tr>


                        </tbody>



                    </table>


                </div>


            </div>





            <div class="card-footer 
                        d-flex 
                        justify-content-between 
                        align-items-center">


                <div>


                    <strong>
                        Report Generated :
                    </strong>


                    <span id="generatedDate">
                        --
                    </span>


                </div>




                <div>


                    <strong>
                        Total Sales :
                    </strong>


                    <span class="text-success fw-bold">


                        ₹ <span id="totalSalesFooter">
                            0.00
                        </span>


                    </span>


                </div>


            </div>



        </div>



    </div>



</div>




<script src="${pageContext.request.contextPath}/js/report.js"></script>



<%@ include file="includes/footer.jsp" %>