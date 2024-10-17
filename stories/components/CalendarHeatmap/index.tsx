import * as React from "react";
import {
  compareDate,
  generateFullWeekList,
  nextDate,
} from "../../shared-utils/date-utils";
import { IHeatmapItem, TagEnum } from "./typings";

import "./index.scss";

interface CalendarStruct {
  mon: Date[];
  tue: Date[];
  wed: Date[];
  thu: Date[];
  fri: Date[];
  sat: Date[];
  sun: Date[];
}

interface TRItemProps {
  weeks: Date[];
  weekStr: string;
  data: IHeatmapItem[];
}

function TRItem(props: TRItemProps) {
  return (
    <tr>
      <td className="weekStr">{props.weekStr}</td>
      {props.weeks.map((item, idx) => {
        const right = idx + 10 >= props.weeks.length;
        const data = props.data.filter((it) =>
          compareDate(new Date(it.date), item)
        );
        const length = data.length;

        const level = (() => {
          if (length === 0) return 0;
          if (length === 1) return 1;
          if (length === 2) return 2;
          if (length === 3) return 3;
          return 4;
        })();

        const urls = () => {
          if (!level) return <></>;

          return (
            <ul>
              {data.map((ht) => {
                return (
                  <li key={ht.url.url}>
                    <a href={ht.url.url}>{ht.url.title}</a>
                  </li>
                );
              })}
            </ul>
          );
        };

        return (
          <td
            className={`td-item${
              right ? " td-item__right" : ""
            } td-item-l${level}`}
            key={item.getTime()}
          >
            <div className="td-wrapper">
              <div style={{ textAlign: "center" }}>
                {item.getFullYear()}年{item.getMonth() + 1}月{item.getDate()}日
              </div>
              {urls()}
            </div>
          </td>
        );
      })}
    </tr>
  );
}

export interface CalendarHeatmapProps {
  data: IHeatmapItem[];
  year: number;
}

export function CalendarHeatmap(props: CalendarHeatmapProps) {
  const [data, setData] = React.useState(props.data);
  const [tagEnum, setTagEnum] = React.useState<TagEnum>(TagEnum.all);
  const [tagID, setTagID] = React.useState<string>("all");

  Object.assign(window, { $data: props });

  const weekList = generateFullWeekList(props.year);
  const foo = weekList.reduce<CalendarStruct>(
    (prev, curr) => {
      const startDate = curr[0];
      prev.mon.push(startDate);
      prev.tue.push(nextDate(startDate, 1));
      prev.wed.push(nextDate(startDate, 2));
      prev.thu.push(nextDate(startDate, 3));
      prev.fri.push(nextDate(startDate, 4));
      prev.sat.push(nextDate(startDate, 5));
      prev.sun.push(nextDate(startDate, 6));
      return prev;
    },
    {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    }
  );

  React.useEffect(() => {
    if (tagEnum === TagEnum.all) {
      setData(props.data);
      return;
    }

    const data = props.data.filter((item) => {
      const res = item.tags.findIndex((tag) => {
        return tag.tag === tagEnum;
      });
      return res !== -1;
    });

    console.log("data", data);
    setData(data);
  }, [tagEnum]);

  return (
    <>
      <table className="CalendarHeatmap">
        <thead>
          <tr style={{ height: "13px" }}>
            <td style={{ width: "24px" }}></td>
            <td colSpan={4}>1月</td>
            <td colSpan={5}>2月</td>
            <td colSpan={4}>3月</td>
            <td colSpan={4}>4月</td>
            <td colSpan={5}>5月</td>
            <td colSpan={4}>6月</td>
            <td colSpan={5}>7月</td>
            <td colSpan={4}>8月</td>
            <td colSpan={4}>9月</td>
            <td colSpan={5}>10月</td>
            <td colSpan={4}>11月</td>
            <td colSpan={4}>12月</td>
          </tr>
        </thead>
        <tbody className={`tbody__${tagID}`}>
          <TRItem data={data} weeks={foo.mon} weekStr="Mon" />
          <TRItem data={data} weeks={foo.tue} weekStr="Tue" />
          <TRItem data={data} weeks={foo.wed} weekStr="Wed" />
          <TRItem data={data} weeks={foo.thu} weekStr="Thu" />
          <TRItem data={data} weeks={foo.fri} weekStr="Fri" />
          <TRItem data={data} weeks={foo.sat} weekStr="Sat" />
          <TRItem data={data} weeks={foo.sun} weekStr="Sun" />
        </tbody>
      </table>
      <div
        className="tags"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setTagID(target.id);
          setTagEnum(Number(target.value) as TagEnum);
        }}
      >
        <span className="tag">
          <input
            type="radio"
            defaultChecked
            id="all"
            name="contact"
            value="0"
          />
          <label htmlFor="all">所有</label>
        </span>

        <span className="tag">
          <input type="radio" id="perf" name="contact" value="1" />
          <label className="label label__perf" htmlFor="perf">
            性能体验
          </label>
        </span>

        <span className="tag">
          <input type="radio" id="suggest" name="contact" value="2" />
          <label className="label label__suggest" htmlFor="suggest">
            产品建议
          </label>
        </span>

        <span className="tag">
          <input type="radio" id="bug" name="contact" value="3" />
          <label className="label label__bug" htmlFor="bug">
            缺陷反馈
          </label>
        </span>

        <span className="tag">
          <input type="radio" id="praise" name="contact" value="4" />
          <label className="label label__praise" htmlFor="praise">
            激励反馈
          </label>
        </span>
      </div>
    </>
  );
}
