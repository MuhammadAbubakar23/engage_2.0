import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShareFacebookResponseService } from 'src/app/services/share-facebook-response.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'post-stats',
  templateUrl: './post-stats.component.html',
  styleUrls: ['./post-stats.component.scss'],
})
export class PostStatsComponent implements OnInit {
  FacebookData: any;
  postIdForStats: any;
  pageIdForStats: any;
  totalPostReactionsCount: number = 0;
  totalCommentReactionsCount: number = 0;
  commentIdForStats: any;
  public Subscription !: Subscription

  constructor(private commonService : CommonDataService,
    private shareFbResService : ShareFacebookResponseService) {}

  ngOnInit(): void {
    debugger
    this.Subscription = this.shareFbResService.getMessage().subscribe((res) => {
      debugger
      this.FacebookData = res;
      
      if (this.FacebookData != null || undefined) {
        this.FacebookData.forEach(async (post: any): Promise<void> => {
          this.postIdForStats = post.post.postId;
          this.pageIdForStats = post.post?.postId.split('_')[0];
  
          await this.commonService
            .GetFbPostStats(this.pageIdForStats, this.postIdForStats)
            .subscribe((postStats: any) => {
              post.post['postStats'] = postStats;
  
              this.totalPostReactionsCount =
                postStats.reactioinsLIst.like +
                postStats.reactioinsLIst.love +
                postStats.reactioinsLIst.wow +
                postStats.reactioinsLIst.haha +
                postStats.reactioinsLIst.sorry +
                postStats.reactioinsLIst.anger +
                postStats.reactioinsLIst.sad +
                postStats.reactioinsLIst.thankful +
                postStats.reactioinsLIst.pride +
                postStats.reactioinsLIst.cARE;
              // this.SpinnerService.hide();
            });
        });
      }
      this.FacebookData.forEach((post: any) => {
        post.comments.forEach(async (comment: any) => {
          this.commentIdForStats = comment.commentId;
  
          await this.commonService
            .GetFbCommentStats(this.pageIdForStats, this.commentIdForStats)
            .subscribe((commentStats: any) => {
              comment['comStats'] = commentStats;
  
              this.totalCommentReactionsCount =
                commentStats.reactioinsLIst.like +
                commentStats.reactioinsLIst.love +
                commentStats.reactioinsLIst.wow +
                commentStats.reactioinsLIst.haha +
                commentStats.reactioinsLIst.sorry +
                commentStats.reactioinsLIst.anger +
                commentStats.reactioinsLIst.sad +
                commentStats.reactioinsLIst.thankful +
                commentStats.reactioinsLIst.pride +
                commentStats.reactioinsLIst.cARE;
            });
        });
      });
    });

    this.fbStats();
  }

  fbStats() {
    debugger
    if (this.FacebookData != null || undefined) {
      this.FacebookData.forEach(async (post: any): Promise<void> => {
        this.postIdForStats = post.post.postId;
        this.pageIdForStats = post.post?.postId.split('_')[0];

        await this.commonService
          .GetFbPostStats(this.pageIdForStats, this.postIdForStats)
          .subscribe((postStats: any) => {
            post.post['postStats'] = postStats;

            this.totalPostReactionsCount =
              postStats.reactioinsLIst.like +
              postStats.reactioinsLIst.love +
              postStats.reactioinsLIst.wow +
              postStats.reactioinsLIst.haha +
              postStats.reactioinsLIst.sorry +
              postStats.reactioinsLIst.anger +
              postStats.reactioinsLIst.sad +
              postStats.reactioinsLIst.thankful +
              postStats.reactioinsLIst.pride +
              postStats.reactioinsLIst.cARE;
            // this.SpinnerService.hide();
          });
      });
    }
    this.FacebookData.forEach((post: any) => {
      post.comments.forEach(async (comment: any) => {
        this.commentIdForStats = comment.commentId;

        await this.commonService
          .GetFbCommentStats(this.pageIdForStats, this.commentIdForStats)
          .subscribe((commentStats: any) => {
            comment['comStats'] = commentStats;

            this.totalCommentReactionsCount =
              commentStats.reactioinsLIst.like +
              commentStats.reactioinsLIst.love +
              commentStats.reactioinsLIst.wow +
              commentStats.reactioinsLIst.haha +
              commentStats.reactioinsLIst.sorry +
              commentStats.reactioinsLIst.anger +
              commentStats.reactioinsLIst.sad +
              commentStats.reactioinsLIst.thankful +
              commentStats.reactioinsLIst.pride +
              commentStats.reactioinsLIst.cARE;
          });
      });
    });
  }
}
