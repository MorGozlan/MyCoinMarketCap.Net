$(document).ready(function () {
    //alert("MorGozlan")
     

            // CONFIG //
            /*-------------------------------------------------------*/
            var mainColWidth = 3;
            var mainCurrencies = [ 'bitcoin', 'ethereum', 'ripple', 'litecoin' ];

            var otherColWidth = 3;
            var otherCurrencies = [ 
                            
                'dogecoin',
                'verge',
                'cardano',
                'tron',
                'nxt',
                'siacoin',
                'monero',
                'nem',
                'bytecoin-bcn',
                'iota',
                'stellar',
                'lisk',
                'bitshares',
                'stratis',
                'steem',
                'reddcoin',
           ];
                //add to otherCurrencies = []
                var count;
                var obj;
                function recherche() {
                    xhr = new XMLHttpRequest();
                    xhr.open("GET", "https://api.coinmarketcap.com/v1/ticker/?limit=100", true);
                    xhr.send(null);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            var res = xhr.responseText;
                            obj = JSON.parse(res);

                            for (count = 0; count < obj.length; count++) {
                                //c
                                console.log("'"+obj[count].id+"',");
                                otherCurrencies.push("'"+obj[count].id+"',");
                            }
                        }
                    }
                }
                   //alert(obj);
                //window.onload = recherche;

            
            
            var myCurrencies = {
                'bitcoin': 0,
                'ethereum': 0,
                'ripple': 750,
                'litecoin':6,
                
                
            };
                   
            // CONFIG END //
            /*-------------------------------------------------------*/

            function updateDashboard(mainColWidth, mainCurrencies, otherColWidth, otherCurrencies) {
                $('.main-row').html('<h3 style="font-family:Comic Sans Ms;text-align: center;">My Wallet</h3>');
                for (var i = 0; i < mainCurrencies.length; i++) {
                    $('.main-row').append('<div class="coinmarketcap-currency-widget col-md-' + mainColWidth + '" data-currency="' + mainCurrencies[i] + '" data-base="USD" data-secondary="BTC" data-ticker="true" data-rank="true" data-marketcap="true" data-volume="true" data-stats="USD" data-statsticker="false"></div>');
                }

                $('.other-row').html('<h3 style="font-family:Comic Sans Ms;text-align: center;">Top 100</h3>');
                for (var i = 0; i < otherCurrencies.length; i++) {
                    $('.other-row').append('<div class="coinmarketcap-currency-widget col-md-' + otherColWidth + '" data-currency="' + otherCurrencies[i] + '" data-base="USD" data-secondary="BTC" data-ticker="true" data-rank="true" data-marketcap="true" data-volume="true" data-stats="USD" data-statsticker="false"></div>');
                }

                $('#cmc-script').replaceWith('<script id="cmc-script" type="text/javascript" src="' + $('#cmc-script').prop('src') + '"><\/script>');
            }

            function updateMyCurrencies(myCurrencies) {
                var total = 0;
                $('.currencies-list').html('');
                for (var currency in myCurrencies) {
                    $.ajax({
                        url: 'https://api.coinmarketcap.com/v1/ticker/' + currency + '/?convert=EUR',
                        type: "GET",
                        dataType: "JSON",
                        async: false,
                        success: function(data) {
                            $('.currencies-list').append('<li data-value="' + ( myCurrencies[currency] * data[0].price_usd ) + '"><u>' + data[0].symbol + '</u> <span style="font-size:11px;">(' + myCurrencies[currency]+ ')</span> = ' + Number(( myCurrencies[currency] * data[0].price_usd ).toFixed(6)) + '</li>');
                        }
                    });
                }

                $( ".currencies-list li" ).each(function( index ) {
                    total += parseFloat(this.getAttribute('data-value'));
                });

                $('.total').html(Number(total.toFixed(4)) + ' $');
            }

            $(document).ready(function () {

                updateDashboard(mainColWidth, mainCurrencies, otherColWidth, otherCurrencies);
                updateMyCurrencies(myCurrencies);

                window.setInterval(function(){
                    updateMyCurrencies(myCurrencies);
                }, 60000);

                window.setInterval(function(){
                    updateDashboard(mainColWidth, mainCurrencies, otherColWidth, otherCurrencies);
                }, 300000);
                
            });
           
        
})
