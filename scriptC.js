var cntC = 0;

$(document).ready(function(){
    // 행 생성
    $('#createC').click(function(){
        var html = '<tr id="tr_valueC'+cntC+'"><td><form><select id="isuC'+cntC+'"><option value="전공">전공</option><option value="교양">교양</option><select></form></td>';
        html += '<td><form><select id="pilsuC'+cntC+'"><option value="선택">선택</option><option value="필수">필수</option></select></form></td>';
        html += '<td><input type="text" id="subjectC'+cntC+'"></td>';
        html += '<td><input type="text" id="hakjumC'+cntC+'" size=4></td>';
        html += '<td><input type="text" id="chulsukC'+cntC+'" size=4></td>';
        html += '<td><input type="text" id="homeworkC'+cntC+'" size=4></td>';
        html += '<td><input type="text" id="mid_testC'+cntC+'" size=4></td>';
        html += '<td><input type="text" id="last_testC'+cntC+'" size=4></td>';
        html += '<td><input type="text" id="total_scoreC'+cntC+'" size=4 readonly></td>';
        html += '<td><input type="text" id="averageC'+cntC+'" size=4 readonly></td>';
        html += '<td id="changeC'+cntC+'"><input type="text" id="gradeC'+cntC+'" size=4 readonly></td>'; // selectbox로 변경 할 수 있기에 td에도 id를 부여
        html += '<td><input type="checkbox" name="chkboxC"  id="chkboxC'+cntC+'" value="'+cntC+'"></td>'; // 체크박스 설정
        $('tbody.rowsC').append(html);
        cntC++;
    })

    // 체크박스 전체 선택 및 해제
    $('#allCheckC').click(function(){
        if($('#allCheckC').prop("checked")){
            $("input[type=checkbox]").prop("checked", true);
        } else {
            $("input[type=checkbox]").prop("checked", false);
        }
    })

    // 해당 체크 행 삭제
    $('#removeC').click(function(){
        var temp_cntC = 0;
        var removeCd_indexs = new Array();
        if(confirm("삭제하시겠습니까?")){
            $("input[name=chkboxC]:checked").each(function(){
                var tr_valueC = $(this).val();

                temp_cntC++; // 삭제 된 행의 개수 구하기
                removeCd_indexs.push(parseInt(tr_valueC)); // 맨 처음 삭제 된 index 값을 구하기 위해 배열로 저장

                var tr = $("tr[id='tr_valueC"+tr_valueC+"']");
                tr.remove();
            })
        } else {
            return false;
        }

        // 체크 박스로 지정한 행 삭제 되었을 때 id값 채우기
        var next_index = 0; // removeCd_indexs 즉, 삭제 된 처음의 값부터 채워넣기 위한 증가 변수
        $(".rowsC tr").each(function(){
            var temp_num = $(this).attr('id'); // 현재 남은 행의 id의 문자열을 temp_num에 삽입 -> 예로 'tr_valueC0' 삽입
            temp_num = temp_num.replace(/[^0-9]/g, ''); // 문자열에서 숫자만 추출하여 다시 temp_num에 삽입
            temp_num = parseInt(temp_num); // 문자열 형태의 숫자를 정수형으로 변경
    
                if(temp_num > removeCd_indexs[0] ){ 
                    console.log("현재의 next_index: " + next_index);
                    console.log("현재의 temp_num :" + temp_num);
                    $("#tr_valueC"+temp_num).attr('id', 'tr_valueC' + (removeCd_indexs[0] + next_index));
                    $("#isuC"+temp_num).attr('id', 'isuC' + (removeCd_indexs[0] + next_index));
                    $("#pilsuC"+temp_num).attr('id', 'pilsuC' +(removeCd_indexs[0] + next_index));
                    $("#subjectC" + temp_num).attr('id', 'subjectC'+(removeCd_indexs[0] + next_index));
                    $("#hakjumC" + temp_num).attr('id', 'hakjumC' + (removeCd_indexs[0] + next_index));
                    $("#chulsukC" + temp_num).attr('id', 'chulsukC' + (removeCd_indexs[0] + next_index));
                    $("#homeworkC" + temp_num).attr('id', 'homeworkC' + (removeCd_indexs[0] + next_index));
                    $("#mid_testC" + temp_num).attr('id', 'mid_testC' + (removeCd_indexs[0] + next_index));
                    $("#last_testC" + temp_num).attr('id', 'last_testC' + (removeCd_indexs[0] + next_index));
                    $("#total_scoreC" + temp_num).attr('id', 'total_scoreC' + (removeCd_indexs[0] + next_index));
                    $("#averageC" + temp_num).attr('id', 'averageC' + (removeCd_indexs[0] + next_index));
                    $("#changeC" + temp_num).attr('id', 'changeC' + (removeCd_indexs[0] + next_index)); // 
                    $("#gradeC" + temp_num).attr('id', 'gradeC' + (removeCd_indexs[0] + next_index)); //  위의 changeC와 같은 행
                    $("#chkboxC" + temp_num).attr('value', (removeCd_indexs[0] + next_index));
                    $("#chkboxC" + temp_num).attr('id', 'chkboxC' + (removeCd_indexs[0] + next_index)); // chkboxC의 value를 바꾸기 위해 id를 만듦
                    next_index++; // 다음 index에 행을 재설정하기 위한 증가
                } 
        })
        cntC = cntC - temp_cntC; // 전체 과목수 및 다음 행 생성을 위한 포인터 역할 변수 체크 삭제 한 만큼 빼기.
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
    $('#saveC').click(function(){
        $('.result_tableC tr').remove() // 합계 테이블 초기화를 위한 삭제
       var hakjumC = 0; // 학점의 합계
       var filter = [0,0,0,0,0]; // NaN 값을 치환하기 위한 필터
       var chulsukC = 0; // 출석점수의 합계
       var homeworkC = 0; // 과제점수의 합계
       var mid_testC = 0; // 중간고사의 합계
       var last_testC = 0; // 기말고사의 합계
       var total_scoreC = 0; // 해당 과목의 총점
       var total_scoreC_hap = 0; // 합계의 총점
       var averageC = 0; // 합계 총점의 평균 -> 합계총점 / 과목수
       var gradeC = ''; // 모든 과목 점수 합계의 성적
       var sub_cntC = cntC; // 1학점 제외 과목 개수 파악

       // 합계 및 해당과목의 총점, 성적을 계산하기 위한 반복문
       for (i=0; i<cntC; i++){
        num = i.toString(); // 인덱스를 위해 문자열로 치환

        console.log(num);

        filter[0] = parseInt($('#hakjumC'+num).val())
        filter[1] = parseInt($('#chulsukC'+num).val())
        filter[2] = parseInt($('#homeworkC'+num).val())
        filter[3] = parseInt($('#mid_testC'+num).val())
        filter[4] = parseInt($('#last_testC'+num).val())

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
            $('#hakjumC'+num).focus();
            return;
        } else if(filter[1] > 20 || filter[1] < 0){
            alert('출석점수는 0~20점만 입력 가능합니다.');
            $('#chulsukC'+num).focus();
            return;
        } else if(filter[2] > 20 || filter[2] < 0){
            alert('과제점수는 0~20점만 입력 가능합니다.');
            $('#homeworkC'+num).focus();
            return;
        } else if(filter[3] > 30 || filter[3] < 0){
            alert('중간고사 점수는 0~30점만 입력 가능합니다.');
            $('#mid_testC'+num).focus();
            return;
        } else if(filter[4] > 30 || filter[4] < 0){
            alert('기말고사 점수는 0~30점만 입력 가능합니다.');
            $('#last_testC'+num).focus();
            return;
        }

        // 학점이 1인 과목 계산에서 제외
        if(filter[0] == 1){
            sub_cntC--;
            filter[0] = 0;
            // 학점이 1이면 성적을 NP 또는 P 중에 선택하도록 변경
            $('#gradeC'+num).remove(); // textbox를 제거하기 위함
            $('#changeC'+num).html('<form><select id="passC'+num+'"><option value="NP">NP</option><option value="P">P</option></select></form>'); // 제거한 textbox 해당란에 td 아이디를 가지고 selectbox를 삽입.
        }

        // 합계를 위한 합산
        hakjumC += filter[0];
        chulsukC += filter[1];
        homeworkC += filter[2];
        mid_testC += filter[3];
        last_testC += filter[4];

        total_scoreC = filter[1]+ filter[2] + filter[3] + filter[4]; // 현재 행의 출석, 과제, 중간, 기말의 점수 합산
        gradeC = sungjuk(total_scoreC); // 현재 행 과목의 성적
        if (total_scoreC == 0){ // 학점이 1인 경우 총점을 구하는 것을 skip한다.
            continue;
        }
        $('#total_scoreC'+num).val(total_scoreC); // 해당 행 총점란에 기입
        $('#gradeC'+num).val(sungjuk(total_scoreC)); //  해당 행 성적란에 기입
        if(gradeC == 'F'){ // 현재 해당 과목이 F면 F를 빨강색으로 처리
            $('#gradeC'+num).css('color', 'red');
        }
       }

       // 합계란 계산 및 삽입
        total_scoreC_hap = total_scoreC_hap + chulsukC + homeworkC+ mid_testC + last_testC;
        averageC = total_scoreC_hap / sub_cntC;
        gradeC = sungjuk(averageC);

        html = '';

        html += "<tr><td colspan = 3><center>" + "합계" + "</center></td>"
        html += "<td>" + hakjumC + "</td>"
        html += "<td>" + chulsukC + "</td>"
        html += "<td>" + homeworkC + "</td>"
        html += "<td>" + mid_testC + "</td>"
        html += "<td>" + last_testC + "</td>"
        html += "<td>" + total_scoreC_hap+ "</td>"
        html += "<td>" + parseInt(averageC) + "</td>"
        html += "<td id='result_color'>" + gradeC + "</td></tr>" // F면 빨강색 처리를 위해 td에 id를 설정

        $('tfoot.result_tableC').append(html);
        if(gradeC == 'F'){ // 합계의 성적이 F면 빨강색으로 처리
            $('#result_color').css('color', 'red');
        }
    })

})
// ■ 각 행의 요소들을 단순히 cntC로 index 할당하면 생기는 현재 문제들
// cntC를 계속 증가시켜서 index를 지정하는 거라 checkbox로 지정한 행을
// 제거하면 행은 없는데 cntC만 늘어나서 평균값이 이상하게 나온다.
// 현재 행 개수 구하기 or 체크 박스로 삭제 할 때 cntC를 어케 구해서 땡겨서 id를 설정하라는데'$("#id1").id() = 새로운 id'
// 차라리 현재 행을 구하는 게 나아보이는데, tr 개수를 구해서 cntC에 넣을까?

// ■ 해야 할 것들
//  1, 2, 3학년 다 만들어야 하는데 이걸 2개 더 만들어야 함. 그럼 이 프로그램은 백업해두고 새로 만들어보자.