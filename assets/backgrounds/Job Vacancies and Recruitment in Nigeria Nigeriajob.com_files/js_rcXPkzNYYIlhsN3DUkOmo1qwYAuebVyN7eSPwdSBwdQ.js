Drupal.locale = { 'pluralFormula': function ($n) { return Number(($n!=1)); }, 'strings': {"":{"Enter in a few keywords separated by \u0022;\u0022 skills that best describe your expertise":"Enter a few keywords separated by \u0022;\u0022 of skills that best describe your expertise","What profile are you looking for ?":"What profile are you looking for?","What job are you looking for ?":"What job are you looking for?","Content limited to @limit characters, remaining: \u003Cstrong\u003E@remaining\u003C\/strong\u003E":"limited to @limit characters, remaining: \u003Cstrong\u003E@remaining\u003C\/strong\u003E","Employment":"Job"}} };;
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function ($) {
    Drupal.behaviors.matching = {
        attach: function (context, settings) {
            $('table[id$="terms"] tr').hide();
            $('table[id$="terms"] tr:lt(26)').show();
            $('input[id*="ematching-searchbar"]').keyup(function () {
                var id = $(this).attr('id');
                var inputId = id.split("ematching-searchbar-");
                var value = $(this).val().toLowerCase();
                if (value !== "") {
                    $("table#"+inputId[1]+"-terms tr").each(function (index) {
                        if (index !== 0) {
                            $row = $(this);
                            var row = $row.find("td").eq(1).text().toLowerCase();

                            if (row.indexOf(value) !== 0) {
                                $row.hide();
                            } else {
                                $row.show();
                            }
                        }
                    });
                } else {
                    $("table#"+inputId[1]+"-terms tr").hide();
                    $("table#"+inputId[1]+"-terms tr:lt(26)").show();
                }
            });
                /* ****************************************************** Circular progress bar **************************************** */ 
            const pageToAddProgressBar = $('body');
            if(pageToAddProgressBar.hasClass('page-user-jobs') || pageToAddProgressBar.hasClass('page-user') && pageToAddProgressBar.hasClass('role-candidate') ) {
               
                jQuery.loadScript = function (url, callback) {
                    jQuery.ajax({
                        url: url,
                        dataType: 'script',
                        success: callback,
                        async: true
                    });
                }
                $.loadScript('/sites/all/modules/custom/ematching/js/circle-progress-bar.min.js', function(){
                    //Stuff to do after someScript has loaded
                    
                    var canvas = document.getElementsByClassName('canvas');
                    [...canvas].forEach((element, idx) => {
                        element.addEventListener('circleProgressBar.afterDraw', function (e) {
                            // var span = document.getElementById('canvas-data');
                            let span = element.parentElement.querySelector('.canvas-data');
                            span.innerText = (e.detail.self.getValue() * 100).toFixed(0) + '%';
                        }, false);

                        element.addEventListener('circleProgressBar.afterFrameDraw', function (e) {
                            // var span = document.getElementById('canvas-data');
                            let span = element.parentElement.querySelector('.canvas-data');
                            var currentValue = (e.detail.self.getValue() * e.detail.progress * 100).toFixed(0) + '%';
                            var currentSpanValue = span.innerText;
                            if (currentSpanValue != currentValue) {
                                span.innerText = currentValue;
                            }
                        }, false);

                        var percentage = element.getAttribute('percentage') / 100;
                        var step = percentage/10;
                        // var rainbowColors = ['#ff0d0d', '#ff4e11', '#ff8e15', '#ff8e15', '#acb334', '#69b34c'];
                        // var rainbowColors = ['#FB1003', '#FF6306', '#FED106', '#D4FE13', '#6AFD0E', '#20FF06'];
                        var rainbowColors = ['#109104', '#198908', '#31C110', '#4CFF05', '#A4FF05', '#FED106', '#FF6306', '#FB1003'];
                        var colors = [];
                        // if(percentage < 0.1) {
                        //     colors= [...colors, rainbowColors[0]];
                        // } else if(percentage >= 0  && percentage < 0.2) {
                        //     colors= [rainbowColors[0], rainbowColors[1]];
                        // } else if(percentage >= 0.2  && percentage < 0.40) {
                        //     colors= [rainbowColors[1], rainbowColors[2]];
                        // } else if(percentage >= 0.40 && percentage < 0.6) {
                        //     colors= [rainbowColors[2], rainbowColors[3]];
                        // } else if(percentage >= 0.6 && percentage < 0.8) {
                        //     colors= [rainbowColors[3], rainbowColors[4]];
                        // } else if(percentage >= 0.8 && percentage < 18) {
                        //     colors= [rainbowColors[4], rainbowColors[5]];
                        // }
                        if(percentage < 0.1) {
                            colors= [...colors, rainbowColors[7]];
                        }else if(percentage >= 0  && percentage < 0.2) {
                            colors= [rainbowColors[7]];
                        } else if(percentage >= 0.2  && percentage < 0.40) {
                            colors= [rainbowColors[6]];
                        } else if(percentage >= 0.40 && percentage < 0.5) {
                            colors= [rainbowColors[5],];
                        } else if(percentage >= 0.5 && percentage < 0.6) {
                            colors= [rainbowColors[4]];
                        } else if(percentage >= 0.6  && percentage < 0.7) {
                            colors= [rainbowColors[3]];
                        } else if(percentage >= 0.7 && percentage < 0.8) {
                            colors= [ rainbowColors[2]];
                        } else if(percentage >= 0.8 && percentage < 0.9) {
                            colors= [rainbowColors[1]];
                        } else if(percentage >= 0.9 && percentage <= 1) {
                            colors= [rainbowColors[0]];
                        }
                        // var colors = ['#fd6357','#14b1bb'];
                        var circleProgressBar = new CircleProgressBar(element, {colors: colors, lineWidth: 25, trackLineColor: '#eee' ,frameStep: 0.1+step});
                        circleProgressBar.setValue(0);
                        $(document).on('scroll',function() {
                            var lastElement = $(element.parentElement.parentElement);
                            var top_of_element = lastElement.offset().top;
                            var bottom_of_element = lastElement.offset().top + lastElement.outerHeight();
                            var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
                            var top_of_screen = $(window).scrollTop();
                            if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
                                // the element is visible, do something
                                circleProgressBar.setValue(percentage);
                            }
                            // console.log(colors);
                        });
                        if(idx == 0 || idx > 0) {
                            var lastElement = $(element.parentElement.parentElement);
                            var top_of_element = lastElement.offset().top;
                            var bottom_of_element = lastElement.offset().top + lastElement.outerHeight();
                            var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
                            var top_of_screen = $(window).scrollTop();
                            if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
                                // the element is visible, do something
                                circleProgressBar.setValue(percentage);
                            }
                        }
                    });
                });
            }
        }
    }
})(jQuery);
;
