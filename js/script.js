const hamburger = document.querySelector(
  ".header .nav-bar .nav-list .hamburger"
);
const mobile_menu = document.querySelector(".header .nav-bar  .nav-list ul");
const menu_item = document.querySelectorAll(
  ".header .nav-bar .nav-list ul li a"
);
const header = document.querySelector(".header.container");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobile_menu.classList.toggle("active");
});

document.addEventListener("scroll", () => {
  var scroll_position = window.scrollY;
  if (scroll_position > 250) {
    header.style.backgroundColor = "#29323c";
  } else {
    header.style.backgroundColor = "transparent";
  }
});

menu_item.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobile_menu.classList.toggle("active");
  });
});

function calculateBmi() {
var weight = document.bmiForm.weight.value
var height = document.bmiForm.height.value

if(weight > 0 && height > 0){	
var finalBmi = weight * 703/(height *height)
document.bmiForm.bmi.value = finalBmi
if(finalBmi < 18.5){
document.bmiForm.meaning.value = "That you are too thin."
}
if(finalBmi > 18.5 && finalBmi < 25){
document.bmiForm.meaning.value = "That you are healthy."
}
if(finalBmi > 25){
document.bmiForm.meaning.value = "That you have overweight."
}
}
else{
alert("Please Fill in everything correctly")
}
}

function trimAll(sString){while (sString.substring(0,1) == ' '){sString = sString.substring(1, sString.length);}while (sString.substring(sString.length-1, sString.length) == ' '){sString = sString.substring(0,sString.length-1);} return sString;}
function cleanNumberInput(inVal){
	var tempVal	= inVal+"";
	while ((tempVal.indexOf(" ")>-1)||(tempVal.indexOf("	")>-1)||(tempVal.indexOf(",")>-1)){
		tempVal = tempVal.replace(" ", "").replace("	", "").replace(",", "");
	}
	return tempVal;
}

function ucParseSelectValue(inStr){
	var tempArray = inStr.split("[");
	var ucOutArray = [];
	ucOutArray.push(trimAll(tempArray[0]));
	ucOutArray.push(trimAll(tempArray[1].replace("]","")));
	if (tempArray.length>2){
		ucOutArray.push(trimAll(tempArray[2].replace("]","")));
	}
	return ucOutArray;
}

function ucCalculateResultNumOnly(inVal, inFrom, inTo){
	var tempResult = 0;
	var tempInVal = inVal;
	var tempInFrom = inFrom+"";
	var tempInTo = inTo+"";
	if ((tempInFrom.indexOf(":")>0)||(tempInTo.indexOf(":")>0)){
		tempArrayFrom = tempInFrom.split(":");
		tempArrayTo = tempInTo.split(":");
		if ((tempArrayFrom.length==3)||(tempArrayTo.length==3)){
			// Temperature
			eval("tempResult = (("+inVal+"-("+tempArrayFrom[2]+"))/(("+tempArrayFrom[1]+")-("+tempArrayFrom[2]+")))*(("+tempArrayTo[1]+")-("+tempArrayTo[2]+"))+(" + tempArrayTo[2] + ");");
		}else{
			if (("3"==tempArrayFrom[0])||("3"==tempArrayTo[0])){
				//Binary
				//alert("tempResult = (parseInt("+inVal+", "+tempArrayFrom[1]+")).toString("+tempArrayTo[1]+");");
				eval("tempResult = (parseInt(\""+inVal+"\", "+tempArrayFrom[1]+")).toString("+tempArrayTo[1]+");");
				return (tempResult+"").toUpperCase();
			}else{
				if (tempInFrom.indexOf(":")>0){
					if (tempInTo.indexOf(":")>0){
						eval("tempResult = " + tempInVal + "*" + tempArrayTo[1] + "/" + tempArrayFrom[1]);
					}else{
						eval("tempResult = 1/" + tempInVal + "*" + tempArrayFrom[1] + "*" + tempInTo);
					}
				}else{
					eval("tempResult = 1/" + tempInVal + "*" + tempInFrom + "*" + tempArrayTo[1]);
				}
			}
		}
	}else{
		eval("tempResult = " + tempInVal + "*" + tempInTo + "/" + tempInFrom);
	}
	return tempResult;
}


function ucDCUpdateResult(usdcType){
	processingType = usdcType;
	var ucfromvalue = cleanNumberInput(document.getElementById("ucfrom").value);
	var ucfromunit = document.getElementById("ucfromunit");
	var uctounit = document.getElementById("uctounit");
	var uctoid = document.getElementById("ucto");
	if (usdcType==1){
		ucfromvalue = cleanNumberInput(document.getElementById("ucto").value);
		ucfromunit = document.getElementById("uctounit");
		uctounit = document.getElementById("ucfromunit");
		uctoid = document.getElementById("ucfrom");
	}
	var ucfromunitvalue = ucfromunit.value;
	var uctounitvalue = uctounit.value;

	if (noValidation==1){
		ucfromvalue = trimAll((ucfromvalue+"").toUpperCase());

		var ucfromunitvalueArray = ucParseSelectValue(ucfromunitvalue);
		var uctounitvalueArray = ucParseSelectValue(uctounitvalue);
		tempBaseNum = parseInt((ucfromunitvalueArray[1]).substr(2).replace("]", ""));
		var tempTestStr = " 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		tempRegStr = "";
		if (tempBaseNum>10){
			tempRegStr = "^[0-9A-"+tempTestStr.substr(tempBaseNum,1)+"]+$";
		}else{
			tempRegStr = "^[0-"+tempTestStr.substr(tempBaseNum,1)+"]+$";
		}
		var reg = new RegExp(tempRegStr);
		if (reg.test(ucfromvalue)){
			var tempResult = 1;
			tempResult = ucCalculateResultNumOnly(ucfromvalue, ucfromunitvalueArray[1], uctounitvalueArray[1]);
			if (uctounitvalueArray[1].indexOf(":")>0){
				var tempUntArray = uctounitvalueArray[1].split(":");
				if (tempUntArray[0]!='3'){
					tempResult = gnumberFormat(tempResult);
				}
			}else{
				tempResult = gnumberFormat(tempResult);
			}
			uctoid.value = tempResult;
			document.getElementById("ucresult").innerHTML = "<font color='red'><b>Result:</b></font> " + ucfromvalue + " " + ucfromunitvalueArray[0] + " = " + tempResult + " " + uctounitvalueArray[0] + "";
			document.getElementById("ucresult").style.color = "black";
			//document.getElementById("ucresult").style.border = "2px solid #406b04";
		}else{
			if (ucfromvalue.length>0){
				document.getElementById("ucresult").innerHTML = "Please provide a valid number!";
				document.getElementById("ucresult").style.color = "red";
				//document.getElementById("ucresult").style.border = "2px solid #406b04";
			}else{
				document.getElementById("ucresult").innerHTML = "";
				//document.getElementById("ucresult").style.border = "2px solid #ffffff";
			}
			uctoid.value = "";
		}
	}else{
		if (!isNumber(ucfromvalue)){
			if (ucfromvalue.length>0){
				document.getElementById("ucresult").innerHTML = "Please provide a valid number!";
				document.getElementById("ucresult").style.color = "red";
				//document.getElementById("ucresult").style.border = "2px solid #406b04";
			}else{
				document.getElementById("ucresult").innerHTML = "";
				//document.getElementById("ucresult").style.border = "2px solid #ffffff";
			}
			uctoid.value = "";
		}else{
			var ucfromunitvalueArray = ucParseSelectValue(ucfromunitvalue);
			var uctounitvalueArray = ucParseSelectValue(uctounitvalue);
			var tempResult = 1;
			var tempResultMore = "";
			if (ucfromunitvalueArray.length>2){
				if (uctounitvalueArray.length>2){
					tempResult = ucCalculateResultNumOnly(ucfromvalue, ucfromunitvalueArray[2], uctounitvalueArray[2]);
					if ((uctounitvalueArray[0]=='foot')||(uctounitvalueArray[0]=='inch')){
						tempResultMore = convertFIToFra(tempResult, uctounitvalueArray[0]);
					}
				}else{
					tempResult = ucCalculateResultNumOnly(ucfromvalue, ucfromunitvalueArray[2], uctounitvalueArray[1]);
				}
			}else{
				if (uctounitvalueArray.length>2){
					tempResult = ucCalculateResultNumOnly(ucfromvalue, ucfromunitvalueArray[1], uctounitvalueArray[2]);
					if ((uctounitvalueArray[0]=='foot')||(uctounitvalueArray[0]=='inch')){
						tempResultMore = convertFIToFra(tempResult, uctounitvalueArray[0]);
					}
				}else{
					tempResult = ucCalculateResultNumOnly(ucfromvalue, ucfromunitvalueArray[1], uctounitvalueArray[1]);
				}
			}
			tempResult = gnumberFormat(tempResult);
			uctoid.value = tempResult;
			document.getElementById("ucresult").innerHTML = "<font color='red'><b>Result:</b></font> " + ucfromvalue + " " + ucfromunitvalueArray[0] + " = " + tempResult + " " + uctounitvalueArray[0] + tempResultMore;
			document.getElementById("ucresult").style.color = "black";
			//document.getElementById("ucresult").style.border = "2px solid #406b04";
		}
	}
}

function showNav(inNavItems){
	var snavHTML = '';
	var snavMainStyle = ' style="background-color: #eee;color:#006633;background-image: url(\'/images/down-arrow.svg\');background-repeat: no-repeat;background-position: right 6px center;"';
	for (i = 0; i < rightNavMain.length; i++) {
		snavHTML += '<a href="#" onClick="return showNav(\''+rightNavMain[i]+'\')"';
		if (inNavItems==rightNavMain[i]) snavHTML += snavMainStyle;
		snavHTML += '>'+rightNavMain[i]+'</a>';

		if (inNavItems==rightNavMain[i]){
			snavHTML += '<div id="ocsubnav">';
			for (j = 0; j < rightNavSub[i].length; j++){
				snavHTML += rightNavSub[i][j];
			}
			snavHTML += '</div>';
		}
	}

	snavHTML = '<div id="octitle">All Converters</div><div id="occontent">'+snavHTML+'<a href="/common-unit-systems.php">Common Unit Systems</a></div>';;
	gObj("othercalc").innerHTML = snavHTML;
	return false;
}

function myFunction() {
  var x, text;

  // Get the value of the input field with id="numb"
  x = document.getElementById("numb").value;

  
    text = x;
    unicode = ("&#x" + x)
  
  document.getElementById("demo").innerHTML = unicode;
}

function Ascii() {
	var num = document.getElementById('num').value;
	var result = String.fromCharCode(num);
	document.getElementById("result").innerHTML = result;
	console.log(result);
}

function UniCon() {
	var num1 = document.getElementById('num1').value;
	text = num1;
	uniCode = ("&#x" + num1)
	document.getElementById("result").innerHTML = uniCode;
}