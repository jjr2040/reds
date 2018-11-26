import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ResourceComment } from '../models/resource-comment';
import { ResourceCommentService } from '../resource-comment.service';

@Component({
  selector: 'app-resource-comments-create',
  templateUrl: './resource-comments-create.component.html',
  styleUrls: ['./resource-comments-create.component.css']
})
export class ResourceCommentsCreateComponent implements OnInit {

  comment: ResourceComment;

  commentForm: FormGroup = this.fb.group({
    title: [''],
    content: ['']
  });

  constructor(
    private fb: FormBuilder,
    private resourceCommentService: ResourceCommentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  saveComment() {
    const comment: ResourceComment = this.commentForm.value;
    comment.resource = this.resourceId;
    this.resourceCommentService.createComment(comment).subscribe( newComment => {
      this.router.navigate(['/resources', newComment.resource]);
    });
  }

  get resourceId(): number {
    return +this.route.snapshot.paramMap.get('resourceId');
  }
}
