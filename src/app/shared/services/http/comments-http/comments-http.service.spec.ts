import { TestBed } from '@angular/core/testing';
import { CommentsHttpService } from './comments-http.service';
import { provideHttpClient } from '@angular/common/http';
import { Comment } from '@app-models';
import { of } from 'rxjs';

describe('CommentsHttpService', () => {
  let service: CommentsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(CommentsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get with correct URL and return mock comments', () => {
    const mockComments: Comment[] = [
      {
        postId: 1,
        id: 1,
        name: 'name1',
        email: 'a@b.com',
        body: 'body1',
      },
    ];

    spyOn(service as any, 'get').and.returnValue(of(mockComments));

    service.getComments(1).subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res[0].postId).toBe(1);
      expect(res[0].id).toBe(1);
      expect(res[0].name).toBe('name1');
      expect(res[0].email).toBe('a@b.com');
      expect(res[0].body).toBe('body1');
    });

    expect((service as any).get).toHaveBeenCalledWith('/posts/1/comments');
  });
});
