import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { CommentsHttpService, PostHttpService } from '@app-shared-services';
import { Comment, Post } from '@app-models';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  let postHttpServiceSpy: jasmine.SpyObj<PostHttpService>;
  let commentsHttpServiceSpy: jasmine.SpyObj<CommentsHttpService>;

  beforeEach(async () => {
    postHttpServiceSpy = jasmine.createSpyObj<PostHttpService>('PostHttpService', ['getPost']);
    commentsHttpServiceSpy = jasmine.createSpyObj<CommentsHttpService>('CommentHttpService', [
      'getComments',
    ]);
    postHttpServiceSpy.getPost.and.returnValue(of(null as unknown as Post));
    commentsHttpServiceSpy.getComments.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [DetailsComponent],
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '1' })),
          },
        },
        {
          provide: PostHttpService,
          useValue: postHttpServiceSpy,
        },
        {
          provide: CommentsHttpService,
          useValue: commentsHttpServiceSpy,
        },
      ],
    }).compileComponents();
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should load post and comments', fakeAsync(() => {
    const dummyPost: Post = { id: 1, title: 'Test', body: 'Body', userId: 1 };
    const dummyComments: Comment[] = [
      { body: 'Comment 1', email: 'a@b.com', id: 1, name: 'name 1', postId: 1 },
      { body: 'Comment 2', email: 'c@d.com', id: 2, name: 'name 2', postId: 2 },
    ];

    postHttpServiceSpy.getPost.and.returnValue(of(dummyPost));
    commentsHttpServiceSpy.getComments.and.returnValue(of(dummyComments));

    createComponent();

    tick();

    expect(component.post()).toEqual(dummyPost);
    expect(component.comments()).toEqual(dummyComments);
  }));

  it('should handle empty post and comments', fakeAsync(() => {
    postHttpServiceSpy.getPost.and.returnValue(of(null as unknown as Post));
    commentsHttpServiceSpy.getComments.and.returnValue(of([]));

    createComponent();
    tick();

    expect(component.post()).toBeNull();
    expect(component.comments()).toEqual([]);
  }));
});
