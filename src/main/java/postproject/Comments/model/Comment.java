package postproject.Comments.model;

import lombok.Data;
import postproject.Board.model.Post;

import javax.persistence.*;

@Entity
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cid;
    private String content;
    // 게시글과 댓글 간의 관계 설정
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pid")
    private Post postDTO;
    private String author;

}