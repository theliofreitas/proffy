import React, { useState, useEffect, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();
    
    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time,
      }
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select 
            name="subject" 
            label="Matéria"
            value={subject}
            onChange={e => { setSubject(e.target.value) }}
            options={[
              { value: 'Jungle Paths', label: 'Jungle Paths'},
              { value: 'The art of Midlane', label: 'The art of Midlane'},
              { value: 'Old Diamond Mechanics', label: 'Old Diamond Mechanics'},
              { value: 'Hook everything', label: 'Hook everything'},
              { value: 'Carry Anyone', label: 'Carry Anyone'},
            ]}
          />
          <Select 
            name="week_day" 
            label="Dia da semana" 
            value={week_day}
            onChange={e => { setWeekDay(e.target.value) }}
            options={[
              { value: '0', label: 'Domingo'},
              { value: '1', label: 'Segunda'},
              { value: '2', label: 'Terça'},
              { value: '3', label: 'Quarta'},
              { value: '4', label: 'Quinta'},
              { value: '5', label: 'Sexta'},
              { value: '6', label: 'Sábado'},
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={e => { setTime(e.target.value) }}
          />

          <button type="submit">
            <span>Buscar</span>
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>

    </div>
  );
}

export default TeacherList;