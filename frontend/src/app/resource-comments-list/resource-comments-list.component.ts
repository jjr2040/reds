import { ResourceCommentService } from './../resource-comment.service';
import { ResourceComment } from './../models/resource-comment';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-resource-comments-list',
  templateUrl: './resource-comments-list.component.html',
  styleUrls: ['./resource-comments-list.component.css']
})
export class ResourceCommentsListComponent implements OnInit, OnChanges {

  @Input() resourceId: number;
  comments: ResourceComment[];

  constructor(
    private resourceCommentService: ResourceCommentService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    if (this.resourceId) {
      this.fetchComments();
    }
  }

  deleteComment(comment: ResourceComment) {
    const swalOptions: any = {
      type: 'warning',
      title: '¿Está seguro que quiere borrar este comentario?',
      text: 'Si borra el comentario no podrá recuperarlo',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, borrar',
      confirmButtonColor: '#DD6B55',
      closeOnConfirm: false
    };

    swal(swalOptions).then( isConfirm => {
      if (isConfirm.dismiss !== swal.DismissReason.cancel) {
        this.resourceCommentService.deleteComment(comment).subscribe( () => {
          const index = this.comments.indexOf(comment);
          this.comments.splice(index, 1);
          swal('¡Listo!', 'El comentario ha sido eliminado', 'success');
        });
      }
    });
  }

  private fetchComments() {
    this.resourceCommentService.getCommentsForResource(this.resourceId).subscribe( comments => this.comments = comments );
  }
}
