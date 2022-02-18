
interface ISubscriber<T> {
    (data: T): void;
}

interface IEvents<T> {
    [key: string]: ISubscriber<T>[]
}

class EventEmitter {
    events: IEvents<any> = {};

    emit<T>(name: string, data: T) {
        this.events[name]?.forEach(listener => listener.call(null, data));
    }

    subscribe<T>(name: string, listener: ISubscriber<T>) {
        if (!this.events[name]) {
            this.events[name] = [];
        }

        this.events[name].push(listener);

        return () => {
            this.events[name] = this.events[name].filter(eventFn => listener !== eventFn);
        }
    }
    
}



class Store {
    events = {}

    get<T>(key: string): T {
        return '' as any
    }

    subscribe<T>(key: string, callback: (data: T) => void) {

    }

}

const store = new Store();

// function useSubscribe<T>(): T {
//     const [data, setData] = useState<T>(store.get(''));

//     useEffect(function() {
//         return store.subscribe('', setData);
//     }, []);

//     return data;
// }

// export {
//     useSubscribe
// }




// For convenience
// type Primitive = string | number | bigint | boolean | undefined | symbol;

// // To infinity and beyond >:D
// export type PropertyStringPath<T, Prefix=''> = {
//     [K in keyof T]: T[K] extends Primitive | Array<any> 
//     ? `${string & Prefix}${ string & K }` 
//     : `${string & Prefix}${ string & K }` | PropertyStringPath <T[K], `${ string & Prefix }${ string & K }.`> ;
// }[keyof T];

// export function propertyStringPathFactory<T>(obj: T, path: PropertyStringPath<T>) {
//     return path;
// };

// export interface User {
//     id: number;
//     name: string;
//     username: string;
//     email: string;
//     address: Address;
//     phone: string;
//     website: string;
//     company: Company;
//   }
  
//   export interface Address {
//     street: string;
//     suite: string;
//     city: string;
//     zipcode: string;
//     geo: Geo;
//   }
  
//   export interface Geo {
//     lat: string;
//     lng: string;
//   }
  
//   export interface Company {
//     name: string;
//     catchPhrase: string;
//     bs: string;
//   }

// export const data: User = Object.create({});

// type ETA = PropertyStringPath<User, "address.geo">;

// export const userFields = propertyStringPathFactory(data, 'address.geo');





interface IPerson {
    name: string;
}
const person: IPerson = {
name: "John",
};

const getName = (p: IPerson) => p.name;
const getLength = (str: string) => str.length;
const isEven = (num: number) => num % 2 === 0;




const test: IHAR = require('./sbi.sberbank.ru.har.json');
// const entries = enrichEntriesID(test?.log?.entries || []);


type ArgType<F> = F extends (arg: infer A) => any ? A : never;

type LastIndexOf<T extends any[]> =
    ((...x: T) => void) extends ((y: any, ...z: infer U) => void)
    ? U['length'] : never

type AsChain<
    F extends Array<(arg: any) => any>,
    G = ((...t: F) => void) extends ((x: any, ...u: infer U) => void) ? U : never
> = {
    [K in keyof F]: (arg: ArgType<F[K]>) => ArgType<K extends keyof G ? G[K] : any>
};


export const compose = <F extends Array<(arg: any) => any>>(...fns: F & AsChain<F>): (arg: ArgType<F[0]>) => ReturnType<F[LastIndexOf<F>]> => {
    return <I extends number>(p: ArgType<F[0]>): ReturnType<F[LastIndexOf<F>]> => 
        fns.reduce((acc: F[I], cur) => cur(acc), p);
}



const myComposedFn1 = compose(getName, isEven, getLength, isEven);

const myComposedFn2 = compose(getName, getLength, isEven);

const myComposedFn3 = compose(getName, isEven, getLength);
  // In vscode if you hover on that function you would see:
  // const myComposedFn: (p: IPerson) => boolean



// declare function flow<F extends [(arg: any) => any, ...Array<(arg: any) => any>]>(
//     ...f: F & AsChain<F>
//   ): (arg: ArgType<F[0]>) => ReturnType<F[LastIndexOf<F>]>;
  

//   type Lookup<T, K extends keyof any> = K extends keyof T ? T[K] : any;

// type Tail<T extends any[]> = 
//   ((...t: T) => void) extends ((x: any, ...u: infer U) => void) ? U : never;


// type ArityOneFn = (arg: any) => any;

// type PickLastInTuple<T extends any[]> = T extends [...rest: infer U, argn: infer L ] ? L : never;

// type FirstFnParameterType<T extends any[]> = Parameters<PickLastInTuple<T>>[any];

// type LastFnReturnType<T extends any[]> = ReturnType<T[0]>;


// export const compose = <T extends ArityOneFn[]>(...fns: T) => 
//     (p: FirstFnParameterType<T>): LastFnReturnType<T> => 
//         fns.reduceRight((acc: any, cur: any) => cur(acc), p);



// type LastIndexOf<T extends any[]> =
//   ((...x: T) => void) extends ((y: any, ...z: infer U) => void)
//   ? U['length'] : never

// // declare function flow<F extends [(arg: any) => any, ...Array<(arg: any) => any>]>(
// //   ...f: F & AsChain<F>
// // ): (arg: ArgType<F[0]>) => ReturnType<F[LastIndexOf<F>]>;


// type ArityOneFn = (arg: any) => any;

// type AsChain<F extends [Func1, ...Func1[]], G extends Func1[]= Tail<F>> =
//   { [K in keyof F]: (arg: ArgType<F[K]>) => ArgType<Lookup<G, K, any>, any> };




describe("Functional helpers", () => {
    it("composes functions", () => {
      const fn1 = (val: string) => `fn1(${val})`;
      const fn2 = (val: string) => `fn2(${val})`;
      const fn3 = (val: string) => `fn3(${val})`;
      const composedFunction = compose(fn1, fn2, fn3);
      expect(composedFunction("inner")).toBe("fn1(fn2(fn3(inner)))");
    });
  
    it("pipes functions", () => {
      const fn1 = (val: string) => `fn1(${val})`;
      const fn2 = (val: string) => `fn2(${val})`;
      const fn3 = (val: string) => `fn3(${val})`;
  
      const pipedFunction = pipe(fn1, fn2, fn3);
  
      expect(pipedFunction("inner")).toBe("fn3(fn2(fn1(inner)))");
    });
  
    it("pipes functions with different initial type", () => {
      const fn1 = (val: string, num: number) => `fn1(${val}-${num})`;
      const fn2 = (val: string) => `fn2(${val})`;
      const fn3 = (val: string) => `fn3(${val})`;
      const pipedFunction = pipe(fn1, fn2, fn3);
  
      expect(pipedFunction("inner", 2)).toBe("fn3(fn2(fn1(inner-2)))");
    });
  });

  

  interface IPerson {
    name: string;
  }
  const person: IPerson = {
    name: "John",
  };
  const getName = (p: IPerson) => p.name;
  const getLength = (str: string) => str.length;
  const isEven = (num: number) => num % 2 === 0;
  type ArityOneFn = (arg: any) => any;
  type PickLastInTuple<T extends any[]> = T extends [...rest: infer U, argn: infer L ] ? L : never;
  type FirstFnParameterType<T extends any[]> = Parameters<PickLastInTuple<T>>[any];
  type LastFnReturnType<T extends any[]> = ReturnType<T[0]>;
  const compose = <T extends ArityOneFn[]>(...fns: T) => (p: FirstFnParameterType<T>): LastFnReturnType<T> =>  fns.reduceRight((acc: any, cur: any) => cur(acc), p);
  const myComposedFn = compose(isEven, getLength, getName);









  type Lookup<T, K extends keyof any, Else=never> = K extends keyof T ? T[K] : Else
  type Tail<T extends any[]> = 
    ((...t: T) => void) extends ((x: any, ...u: infer U) => void) ? U : never;
  type Func1 = (arg: any) => any;
  type ArgType<F, Else=never> = F extends (arg: infer A) => any ? A : Else;
  type AsChain<F extends [Func1, ...Func1[]], G extends Func1[]= Tail<F>> =
    { [K in keyof F]: (arg: ArgType<F[K]>) => ArgType<Lookup<G, K, any>, any> };
  type LastIndexOf<T extends any[]> =
    ((...x: T) => void) extends ((y: any, ...z: infer U) => void)
    ? U['length'] : never
  declare function flow<F extends [(arg: any) => any, ...Array<(arg: any) => any>]>(
    ...f: F & AsChain<F>
  ): (arg: ArgType<F[0]>) => ReturnType<F[LastIndexOf<F>]>;



  export function isEmpty<T>(entity: T): boolean {
    if (Array.isArray(entity)) {
        return entity.length === 0;
    } else if (typeof entity === 'object') {
        for (var prop in entity) {
            if (entity.hasOwnProperty(prop)) {
                return false;
            }
        }
    } else {
        return !entity;
    }
}

export function isNotEmpty<T>(entity: T): boolean {
    return !isEmpty(entity);
}

export function noop() {}

export function cn<T extends string>(...args: T[]): string {
    return args.filter(arg => typeof arg === 'string' && arg?.length > 0).join(' ');
}


















const token = /d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;

const pad = (val, len = 2) => String(val).padStart(len, '0');

let i18n = {
    dayNames: [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    monthNames: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
};

const getDayOfWeek = (date: Date) => {
    const dow = date.getDay();
    if (dow === 0) {
        return 7;
    }
    return dow;
};

const getFormatFlags = (date: Date) => {
    const d = () => date.getDate();
    const D = () => date.getDay();
    const m = () => date.getMonth();
    const y = () => date.getFullYear();
    const H = () => date.getHours();
    const M = () => date.getMinutes();
    const s = () => date.getSeconds();
    const L = () => date.getMilliseconds();
    const o = () => date.getTimezoneOffset();
    const N = () => getDayOfWeek(date);

    const flags = {
        d: () => d(),
        dd: () => pad(d()),
        ddd: () => i18n.dayNames[D()],
        dddd: () => i18n.dayNames[D() + 7],
        m: () => m() + 1,
        mm: () => pad(m() + 1),
        mmm: () => i18n.monthNames[m()],
        mmmm: () => i18n.monthNames[m() + 12],
        yy: () => String(y()).slice(2),
        yyyy: () => pad(y(), 4),
        h: () => H() % 12 || 12,
        hh: () => pad(H() % 12 || 12),
        H: () => H(),
        HH: () => pad(H()),
        M: () => M(),
        MM: () => pad(M()),
        s: () => s(),
        ss: () => pad(s()),
        l: () => pad(L(), 3),
        L: () => pad(Math.floor(L() / 10)),
        o: () =>
            (o() > 0 ? "-" : "+") +
            pad(Math.floor(Math.abs(o()) / 60) * 100 + (Math.abs(o()) % 60), 4),
        p: () =>
            (o() > 0 ? "-" : "+") +
            pad(Math.floor(Math.abs(o()) / 60), 2) +
            ":" +
            pad(Math.floor(Math.abs(o()) % 60), 2),
        N: () => N(),
    };

    return flags;
}


export const parseDate = (date: string) => {
    if (typeof date === 'string') {
        return Date.parse(date)
    }
    return null;
}

export const dateToTimestamp = (date: string): number => {
    if (date) {
        const pDate = new Date(date);
        return parseFloat(`${pDate.getTime()}`); // .${pDate.getMilliseconds()}
    }
    return null;
}


export const formatDate = (date: Date, mask: string) => {
    const flags = getFormatFlags(date);
    return mask.replace(token, (match) => {
        if (match in flags) {
            return flags[match]();
        }
        return match.slice(1, match.length - 1);
    });
}

export const formatDateTable = (date: string) => {
    const pDate = parseDate(date);
    if (pDate) {
        return formatDate(new Date(pDate), 'HH:MM:ss yyyy-mm-dd')
    }
}



(function(){
var monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  var dayOfWeekNames = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  function formatDate(date, patternStr?: string){
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
          hh = twoDigitPad(h),
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
        .replace('hh', hh).replace('h', h)
        .replace('HH', HH).replace('H', hour)
        .replace('mm', mm).replace('m', minute)
        .replace('ss', ss).replace('s', second)
        .replace('S', miliseconds)
        .replace('dd', dd).replace('d', day)
        
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
            .replace('MM', MM)
            .replace('M', M);
      }
      return patternStr;
  }
  function twoDigitPad(num) {
      return num < 10 ? "0" + num : num;
  }
  console.log(formatDate(new Date()));
  console.log(formatDate(new Date(), 'dd-MMM-yyyy')); //OP's request
  console.log(formatDate(new Date(), 'EEEE, MMMM d, yyyy HH:mm:ss.S aaa'));
  console.log(formatDate(new Date(), 'EEE, MMM d, yyyy HH:mm'));
  console.log(formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss.S'));
  console.log(formatDate(new Date(), 'M/dd/yyyy h:mmaaa'));
})





export const isValidJSON = (str: string) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};



export function pipe<A>(...funcs: Array<(arg: A) => A>): (arg: A) => A {
    return funcs.reduce((prevFn, nextFn) => (value: A) => nextFn(prevFn(value)));
};







// export const compose = <T>(...funcs: Array<(value: T) => T>) => (value: T) => funcs.reduceRight((value, func) => func(value), value);





const map = <T, U>(fn: (i: T) => U) => (mappable: T[]) => mappable.map(fn);






// export function compose<A>(...funcs: Array<(arg: A) => A>): (arg: A) => A {
//     return funcs.reduce((prevFn, nextFn) => (value: A) => prevFn(nextFn(value)));
// };

// function reverseAndUpper(str: string): string {
//     return str;
// }

// const a = compose(reverseAndUpper);


// const compose2 = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);


// , F extends Function
// ...funcs: F[]