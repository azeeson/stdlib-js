

(function(){
    var monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
      ];
      var dayOfWeekNames = [
        "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday", "Saturday"
      ];
      function formatDate(date: Date, patternStr?: string){
          if (!patternStr) {
              patternStr = 'M/d/yyyy';
          }
          var day = date.getDate(),
              month = date.getMonth(),
              year = date.getFullYear(),
              hour = date.getHours(),
              minute = date.getMinutes(),
              second = date.getSeconds(),
              miliseconds = date.getMilliseconds(),
              h = String(hour % 12),
              hh = twoDigitPad(parseInt(h)),
              HH = twoDigitPad(hour),
              mm = twoDigitPad(minute),
              ss = twoDigitPad(second),
              aaa = hour < 12 ? 'AM' : 'PM',
              EEEE = dayOfWeekNames[date.getDay()],
              EEE = EEEE.substr(0, 3),
              dd = twoDigitPad(day),
              M = month + 1,
              MM = twoDigitPad(M),
              MMMM = monthNames[month],
              MMM = MMMM.substr(0, 3),
              yyyy = year + "",
              yy = yyyy.substr(2, 2)
          ;
          // checks to see if month name will be used
          patternStr = patternStr
            .replace('hh', hh.toString()).replace('h', h)
            .replace('HH', HH.toString()).replace('H', hour.toString())
            .replace('mm', mm.toString()).replace('m', minute.toString())
            .replace('ss', ss.toString()).replace('s', second.toString())
            .replace('S', miliseconds.toString())
            .replace('dd', dd.toString()).replace('d', day.toString())
            
            .replace('EEEE', EEEE).replace('EEE', EEE)
            .replace('yyyy', yyyy)
            .replace('yy', yy)
            .replace('aaa', aaa);
          if (patternStr.indexOf('MMM') > -1) {
              patternStr = patternStr
                .replace('MMMM', MMMM)
                .replace('MMM', MMM);
          }
          else {
              patternStr = patternStr
                .replace('MM', MM.toString())
                .replace('M', M.toString());
          }
          return patternStr;
      }
      function twoDigitPad(num: number) {
          return num < 10 ? "0" + num : num;
      }
      console.log(formatDate(new Date()));
      console.log(formatDate(new Date(), 'dd-MMM-yyyy')); //OP's request
      console.log(formatDate(new Date(), 'EEEE, MMMM d, yyyy HH:mm:ss.S aaa'));
      console.log(formatDate(new Date(), 'EEE, MMM d, yyyy HH:mm'));
      console.log(formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss.S'));
      console.log(formatDate(new Date(), 'M/dd/yyyy h:mmaaa'));
    })