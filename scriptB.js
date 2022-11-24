var cntB = 0;

$(document).ready(function(){
    // 행 생성
    $('#createB').click(function(){
        var html = '<tr id="tr_valueB'+cntB+'"><td><form><select id="isuB'+cntB+'"><option value="전공">전공</option><option value="교양">교양</option><select></form></td>';
        html += '<td><form><select id="pilsuB'+cntB+'"><option value="선택">선택</option><option value="필수">필수</option></select></form></td>';
        html += '<td><input type="text" id="subjectB'+cntB+'"></td>';
        html += '<td><input type="text" id="hakjumB'+cntB+'" size=4></td>';
        html += '<td><input type="text" id="chulsukB'+cntB+'" size=4></td>';
        html += '<td><input type="text" id="homeworkB'+cntB+'" size=4></td>';
        html += '<td><input type="text" id="mid_testB'+cntB+'" size=4></td>';
        html += '<td><input type="text" id="last_testB'+cntB+'" size=4></td>';
        html += '<td><input type="text" id="total_scoreB'+cntB+'" size=4 readonly></td>';
        html += '<td><input type="text" id="averageB'+cntB+'" size=4 readonly></td>';
        html += '<td id="changeB'+cntB+'"><input type="text" id="gradeB'+cntB+'" size=4 readonly></td>'; // selectbox로 변경 할 수 있기에 td에도 id를 부여
        html += '<td><input type="checkbox" name="chkboxB"  id="chkboxB'+cntB+'" value="'+cntB+'"></td>'; // 체크박스 설정
        $('tbody.rowsB').append(html);
        cntB++;
    })

    // 체크박스 전체 선택 및 해제
    $('#allCheckB').click(function(){
        if($('#allCheckB').prop("checked")){
            $("input[type=checkbox]").prop("checked", true);
        } else {
            $("input[type=checkbox]").prop("checked", false);
        }
    })

    // 해당 체크 행 삭제
    $('#removeB').click(function(){
        var temp_cntB = 0;
        var removeBd_indexs = new Array();
        if(confirm("삭제하시겠습니까?")){
            $("input[name=chkboxB]:checked").each(function(){
                var tr_valueB = $(this).val();

                temp_cntB++; // 삭제 된 행의 개수 구하기
                removeBd_indexs.push(parseInt(tr_valueB)); // 맨 처음 삭제 된 index 값을 구하기 위해 배열로 저장

                var tr = $("tr[id='tr_valueB"+tr_valueB+"']");
                tr.remove();
            })
        } else {
            return false;
        }

        // 체크 박스로 지정한 행 삭제 되었을 때 id값 채우기
        var next_index = 0; // removeBd_indexs 즉, 삭제 된 처음의 값부터 채워넣기 위한 증가 변수
        $(".rowsB tr").each(function(){
            var temp_num = $(this).attr('id'); // 현재 남은 행의 id의 문자열을 temp_num에 삽입 -> 예로 'tr_valueB0' 삽입
            temp_num = temp_num.replace(/[^0-9]/g, ''); // 문자열에서 숫자만 추출하여 다시 temp_num에 삽입
            temp_num = parseInt(temp_num); // 문자열 형태의 숫자를 정수형으로 변경
    
                if(temp_num > removeBd_indexs[0] ){ 
                    console.log("현재의 next_index: " + next_index);
                    console.log("현재의 temp_num :" + temp_num);
                    $("#tr_valueB"+temp_num).attr('id', 'tr_valueB' + (removeBd_indexs[0] + next_index));
                    $("#isuB"+temp_num).attr('id', 'isuB' + (removeBd_indexs[0] + next_index));
                    $("#pilsuB"+temp_num).attr('id', 'pilsuB' +(removeBd_indexs[0] + next_index));
                    $("#subjectB" + temp_num).attr('id', 'subjectB'+(removeBd_indexs[0] + next_index));
                    $("#hakjumB" + temp_num).attr('id', 'hakjumB' + (removeBd_indexs[0] + next_index));
                    $("#chulsukB" + temp_num).attr('id', 'chulsukB' + (removeBd_indexs[0] + next_index));
                    $("#homeworkB" + temp_num).attr('id', 'homeworkB' + (removeBd_indexs[0] + next_index));
                    $("#mid_testB" + temp_num).attr('id', 'mid_testB' + (removeBd_indexs[0] + next_index));
                    $("#last_testB" + temp_num).attr('id', 'last_testB' + (removeBd_indexs[0] + next_index));
                    $("#total_scoreB" + temp_num).attr('id', 'total_scoreB' + (removeBd_indexs[0] + next_index));
                    $("#averageB" + temp_num).attr('id', 'averageB' + (removeBd_indexs[0] + next_index));
                    $("#changeB" + temp_num).attr('id', 'changeB' + (removeBd_indexs[0] + next_index)); // 
                    $("#gradeB" + temp_num).attr('id', 'gradeB' + (removeBd_indexs[0] + next_index)); //  위의 changeB와 같은 행
                    $("#chkboxB" + temp_num).attr('value', (removeBd_indexs[0] + next_index));
                    $("#chkboxB" + temp_num).attr('id', 'chkboxB' + (removeBd_indexs[0] + next_index)); // chkboxB의 value를 바꾸기 위해 id를 만듦
                    next_index++; // 다음 index에 행을 재설정하기 위한 증가
                } 
        })
        cntB = cntB - temp_cntB; // 전체 과목수 및 다음 행 생성을 위한 포인터 역할 변수 체크 삭제 한 만큼 빼기.
    })

    // 성적 알파벳화 함수
    function sungjuk(number){
        if(number >= 95){
            return "A+"
        }else if(number >= 90){
            return "A0"
        }else if(number >= 85){
            return "B+"
        }else if(number >= 80){
            return "B0"
        }else if(number >= 75){
            return "C+"
        }else if(number >= 70){
            return "C0"
        }else if(number >= 65){
            return "D+"
        }else if(number >= 60){
            return "D0"
        }else{
            return "F"
        }
    }

    // 저장 버튼 눌렀을 시 계산하는 함수
    $('#saveB').click(function(){
        $('.result_tableB tr').remove() // 합계 테이블 초기화를 위한 삭제
       var hakjumB = 0; // 학점의 합계
       var filter = [0,0,0,0,0]; // NaN 값을 치환하기 위한 필터
       var chulsukB = 0; // 출석점수의 합계
       var homeworkB = 0; // 과제점수의 합계
       var mid_testB = 0; // 중간고사의 합계
       var last_testB = 0; // 기말고사의 합계
       var total_scoreB = 0; // 해당 과목의 총점
       var total_scoreB_hap = 0; // 합계의 총점
       var averageB = 0; // 합계 총점의 평균 -> 합계총점 / 과목수
       var gradeB = ''; // 모든 과목 점수 합계의 성적
       var sub_cntB = cntB; // 1학점 제외 과목 개수 파악

       // 합계 및 해당과목의 총점, 성적을 계산하기 위한 반복문
       for (i=0; i<cntB; i++){
        num = i.toString(); // 인덱스를 위해 문자열로 치환

        console.log(num);

        filter[0] = parseInt($('#hakjumB'+num).val())
        filter[1] = parseInt($('#chulsukB'+num).val())
        filter[2] = parseInt($('#homeworkB'+num).val())
        filter[3] = parseInt($('#mid_testB'+num).val())
        filter[4] = parseInt($('#last_testB'+num).val())

        // NaN값 0으로 치환
        if (Number.isNaN(filter[0])){
            filter[0] = 0;
        }
        if(Number.isNaN(filter[1])){
            filter[1] = 0;
        }
        if(Number.isNaN(filter[2])){
            filter[2] = 0;
        }
        if(Number.isNaN(filter[3])){
            filter[3] = 0;
        }
        if(Number.isNaN(filter[4])){
            filter[4] = 0;
        }

        // 예외처리
        if(filter[0] > 3 || filter[0] <0){
            alert('학점은 1,2,3점만 입력 가능합니다.');
            $('#hakjumB'+num).focus();
            return;
        } else if(filter[1] > 20 || filter[1] < 0){
            alert('출석점수는 0~20점만 입력 가능합니다.');
            $('#chulsukB'+num).focus();
            return;
        } else if(filter[2] > 20 || filter[2] < 0){
            alert('과제점수는 0~20점만 입력 가능합니다.');
            $('#homeworkB'+num).focus();
            return;
        } else if(filter[3] > 30 || filter[3] < 0){
            alert('중간고사 점수는 0~30점만 입력 가능합니다.');
            $('#mid_testB'+num).focus();
            return;
        } else if(filter[4] > 30 || filter[4] < 0){
            alert('기말고사 점수는 0~30점만 입력 가능합니다.');
            $('#last_testB'+num).focus();
            return;
        }

        // 학점이 1인 과목 계산에서 제외
        if(filter[0] == 1){
            sub_cntB--;
            filter[0] = 0;
            // 학점이 1이면 성적을 NP 또는 P 중에 선택하도록 변경
            $('#gradeB'+num).remove(); // textbox를 제거하기 위함
            $('#changeB'+num).html('<form><select id="passB'+num+'"><option value="NP">NP</option><option value="P">P</option></select></form>'); // 제거한 textbox 해당란에 td 아이디를 가지고 selectbox를 삽입.
        }
        
        // 합계를 위한 합산
        hakjumB += filter[0];
        chulsukB += filter[1];
        homeworkB += filter[2];
        mid_testB += filter[3];
        last_testB += filter[4];

        total_scoreB = filter[1]+ filter[2] + filter[3] + filter[4]; // 현재 행의 출석, 과제, 중간, 기말의 점수 합산
        gradeB = sungjuk(total_scoreB); // 현재 행 과목의 성적
        if (total_scoreB == 0){ // 학점이 1인 경우 총점을 구하는 것을 skip한다.
            continue;
        }
        $('#total_scoreB'+num).val(total_scoreB); // 해당 행 총점란에 기입
        $('#gradeB'+num).val(sungjuk(total_scoreB)); //  해당 행 성적란에 기입
        if(gradeB == 'F'){ // 현재 해당 과목이 F면 F를 빨강색으로 처리
            $('#gradeB'+num).css('color', 'red');
        }
       }

       // 합계란 계산 및 삽입
        total_scoreB_hap = total_scoreB_hap + chulsukB + homeworkB+ mid_testB + last_testB;
        averageB = total_scoreB_hap / sub_cntB;
        gradeB = sungjuk(averageB);

        html = '';

        html += "<tr><td colspan = 3><center>" + "합계" + "</center></td>"
        html += "<td>" + hakjumB + "</td>"
        html += "<td>" + chulsukB + "</td>"
        html += "<td>" + homeworkB + "</td>"
        html += "<td>" + mid_testB + "</td>"
        html += "<td>" + last_testB + "</td>"
        html += "<td>" + total_scoreB_hap+ "</td>"
        html += "<td>" + parseInt(averageB) + "</td>"
        html += "<td id='result_color'>" + gradeB + "</td></tr>" // F면 빨강색 처리를 위해 td에 id를 설정

        $('tfoot.result_tableB').append(html);
        if(gradeB == 'F'){ // 합계의 성적이 F면 빨강색으로 처리
            $('#result_color').css('color', 'red');
        }
    })

})
