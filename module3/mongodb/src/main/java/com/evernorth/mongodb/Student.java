package com.evernorth.mongodb;

import org.bson.types.ObjectId;

public class Student {

	private ObjectId id;
	private int studentId;
	private String subject;
	private String grade;
	private int age;

	public Student(int studentId, String subject, String grade, int age) {
		setStudentId(studentId);
		setAge(age);
		setGrade(grade);
		setSubject(subject);
	}

	public Student() {
	}

	public ObjectId getId() {
		return id;
	}

	public void setId(ObjectId id) {
		this.id = id;
	}

	public int getStudentId() {
		return studentId;
	}

	public void setStudentId(int studentId) {
		this.studentId = studentId;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	@Override
	public boolean equals(final Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}

		Student student = (Student) o;

		if (getStudentId() != student.getStudentId()) {
			return false;
		}
		if (getId() != null ? !getId().equals(student.getId()) : student.getId() != null) {
			return false;
		}
		if (getSubject() != null ? !getSubject().equals(student.getSubject()) : student.getSubject() != null) {
			return false;
		}
		if (getGrade() != null ? !getGrade().equals(student.getGrade()) : student.getGrade() != null) {
			return false;
		}
		if (getAge() != student.getAge()) {
			return false;
		}

		return true;
	}

	@Override
	public int hashCode() {
		int result = getId() != null ? getId().hashCode() : 0;
		result = 31 * result + (getSubject() != null ? getSubject().hashCode() : 0);
		result = 31 * result + getAge();
		result = 31 * result + getStudentId();
		result = 31 * result + (getGrade() != null ? getGrade().hashCode() : 0);
		return result;
	}

	@Override
	public String toString() {
		return "Person{"
				+ "id='" + id + "'"
				+ ", student_id='" + studentId + "'"
				+ ", subject='" + subject + "'"
				+ ", grade='" + grade + "'"
				+ ", age=" + age
				+ "}";
	}

}
