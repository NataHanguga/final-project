import { Injectable } from '@angular/core';
import { GradeService } from './grade.service';
import { PersentsService } from './persents.service';
import { writeFileSync, readFileSync } from 'fs';
import { Document, Packer, Paragraph } from 'docx';

@Injectable({
  providedIn: 'root'
})
export class TeacherFunctionsService {

  constructor( private grade: GradeService,
               private percents: PersentsService) {}

  public getGradeData() {
    return this.grade.getGrades();
  }

  public getPersentData() {
    return this.percents.getPersent();
  }

  // public createTable() {
  //   const doc = new Document();
  //   const table = doc.createTable(4, 4);
  //   table.getCell(2, 2).addContent(new Paragraph('Hello'));

  //   const packer = new Packer();

  //   packer.toBuffer(doc).then((buffer) => {
  //       writeFileSync('My Document.docx', buffer);
  //   });
  // }


}
