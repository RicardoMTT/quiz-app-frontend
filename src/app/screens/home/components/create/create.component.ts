import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CuestionarioService } from 'src/app/_services/cuestionario.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  typeQuestionaries: Observable<any>;

  quizForm: FormGroup;
  questions: FormArray;
  options: FormArray;
  constructor(
    private cuestionarioService: CuestionarioService,
    private fb: FormBuilder
  ) {
    this.quizForm = this.fb.group({
      name: ['', [Validators.required]],
      typeQuiz: [null, [Validators.required]],
      questions: this.fb.array([], [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.typeQuestionaries = this.cuestionarioService.getTypeQuestionario();
  }

  addQuestion() {
    this.questions = this.quizForm.get('questions') as FormArray;
    this.questions.push(this.createItem());
  }
  createItem() {
    return this.fb.group({
      descripcion: [''],
      options: this.fb.array([]),
    });
  }
  // getQuestions(form) {
  //   return form.controls.questions.controls;
  // }

  getCtrl(key: string, form: FormGroup) {
    return form.get(key);
  }
  removeQuestion(index) {
    console.log(index);

    this.questions.removeAt(index);
  }

  addOption(index) {
    this.options = this.quizForm.get('questions')['controls'][index][
      'controls'
    ]['options'] as FormArray;
    if (this.options) {
      this.options.push(this.createOptionItem());
    }
  }
  getOptgions(form) {
    return form.controls.options.controls;
  }
  createOptionItem() {
    return this.fb.group({
      nameOption: [''],
      isCorrect: this.fb.control(null),
    });
  }
  removeOption(index) {
    this.options.removeAt(index);
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };
  createQuiz() {
    const { name, questions, typeQuiz } = this.quizForm.value;

    const newQuestions = questions.map((question) => {
      const newOptions = question.options.map((option) => ({
        correct: option.isCorrect === 'true' ? true : false,
        content: option.nameOption,
      }));
      return {
        descripcion: question.descripcion,
        opciones: newOptions,
      };
    });

    const newQuiz = {
      name,
      preguntas: newQuestions,
      tipoCuestionario: parseInt(typeQuiz),
    };
    this.questions.clear();
    this.cuestionarioService.createQuiz(newQuiz).subscribe(
      (resp) => {
        console.log('resp', resp);
      },
      (error) => {
        console.log('error', error);
      },
      () => {
        this.quizForm.reset();
        console.log(this.questions.length);

        // this.clearFormArray(this.questions);
      }
    );
  }
}
