import { TestBed } from '@angular/core/testing';
import { PostHttpService } from './post-http.service';
import { provideHttpClient } from '@angular/common/http';
import { Post } from '@app-models';
import { of } from 'rxjs';

describe('PostHttpService', () => {
  let service: PostHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(PostHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get with correct URL and return mock posts (getPosts)', () => {
    const mockPosts: Post[] = [
      { userId: 1, id: 1, title: 'Post 1', body: 'Body 1' },
      { userId: 2, id: 2, title: 'Post 2', body: 'Body 2' },
    ];

    spyOn(service as any, 'get').and.returnValue(of(mockPosts));

    service.getPosts(2).subscribe((res) => {
      expect(res.length).toBe(2);
      expect(res[0].id).toBe(1);
      expect(res[0].title).toBe('Post 1');
      expect(res[1].id).toBe(2);
      expect(res[1].title).toBe('Post 2');
    });

    expect((service as any).get).toHaveBeenCalledWith('/posts?_limit=2');
  });

  it('should call get with correct URL and return mock single post (getPost)', () => {
    const mockPost: Post = {
      userId: 1,
      id: 1,
      title: 'Test Post',
      body: 'This is a test post body',
    };

    spyOn(service as any, 'get').and.returnValue(of(mockPost));

    service.getPost(1).subscribe((res) => {
      expect(res).toEqual(mockPost);
      expect(res.id).toBe(1);
      expect(res.title).toBe('Test Post');
    });

    expect((service as any).get).toHaveBeenCalledWith('/posts/1');
  });
});
