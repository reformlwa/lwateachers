import React, { useState, useEffect } from 'react';
import { readString } from 'react-papaparse';
import './TeacherTable.css'

function furloughedCell(furloughed) {
  const noramlizedFurloughed = furloughed.toLowerCase()
  switch (noramlizedFurloughed) {
    case 'f':
      return <td className="false-cell">No</td>
    case 't':
      return <td className="true-cell">Yes</td>
    case '?':
      return <td className="unk-cell">Unknown</td>
  }
}

function offerCell(offer) {
  const noramlizedOffer = offer.toLowerCase()
  switch (noramlizedOffer) {
    case 'f':
      return <td className="false-cell">None</td>
    case 't':
      return <td className="true-cell">Received</td>
    case '?':
      return <td className="unk-cell">Unknown</td>
  }
}

function returningCell(returning) {
  const noramlizedReturning = returning.toLowerCase()
  switch (noramlizedReturning) {
    case 'f':
      return <td className="false-cell">No</td>
    case 't':
      return <td className="true-cell">Yes</td>
    case '?':
      return <td className="unk-cell">Unknown</td>
  }
}

function teacherStats(teachers = []) {
  const sums = {
    teacher: '',
    furloughed: 0,
    offer: 0,
    returning: 0,
  }
  if (teachers.length === 0) return sums
  teachers.forEach((teacher) => {
    teacher.furloughed.toLowerCase() === 't' && (sums.furloughed += 1);
    teacher.offer.toLowerCase() === 't' && (sums.offer = sums.offer + 1);
    teacher.returning.toLowerCase() === 't' && (sums.returning += 1);
  })

  const avg = {
    teacher: '',
    furloughed: (sums.furloughed / teachers.length) * 100,
    offer: (sums.offer / teachers.length) * 100,
    returning: (sums.returning / teachers.length) * 100,
  }
  return avg;
}

function teacherAveragesInformation(teachers) {
  const averages = teacherStats(teachers)
  return (
    <tr className="table-secondary">
      <th scope="row">Percentages</th>
      <td><b>{averages.furloughed + "%"}</b></td>
      <td><b>{averages.offer + "%"}</b></td>
      <td><b>{averages.returning + "%"}</b></td>
    </tr>

  )
}

function sectionFilter(section) {
  if (section === "all") {
    return () => true
  }
  return (teacher) => {
    return teacher.section.toLowerCase() === section
  }
}

const validSections = [
  {
    value: 'all',
    display: 'All Teachers'
  },
  {
    value: 'l',
    display: 'Lower School'
  },
  {
    value: 'm',
    display: 'Middle School'
  },
  {
    value: 'u',
    display: 'Upper School'
  },
]


function TeacherTable() {
  const [teachers, setTeachers] = useState([])
  // Valid sections are 'all', 'u', 'm', 'l',
  const [section, setSection] = useState("all")

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${process.env.PUBLIC_URL}/data/teachers.csv`).then((res) => res.text());
      console.log("TeacherTable -> data", data)
      const newTeachers = readString(data, {
        header: true
      }).data;
      setTeachers(newTeachers);
    };
    fetchData();
  }, []);

  const filteredTeachers = teachers.filter(sectionFilter(section))

  return (
    <>
      <div className="table-header">
        <span className="table-title"> Teachers </span>
        <select value={section} onChange={(event) => setSection(event.target.value)}>
          {validSections.map((section) => (
            <option key={section.value} value={section.value}>{section.display}</option>
          ))}
        </select>
      </div>
      <table className="table table-striped table-responsive-sm">
        <thead className="thead-dark">
          <tr>
            <th>Teacher</th>
            <th>Furloughed</th>
            <th>Contract</th>
            <th>Returning</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeachers.map((teacher) => {
            return (
              <tr key={teacher.teacher}>
                <th scope="row">{teacher.teacher}</th>
                {furloughedCell(teacher.furloughed)}
                {offerCell(teacher.offer)}
                {returningCell(teacher.returning)}
              </tr>
            );
          })}
          {teacherAveragesInformation(filteredTeachers)}
        </tbody>
      </table>
    </>
  )
}

export default TeacherTable;